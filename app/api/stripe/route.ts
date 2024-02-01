import { auth, currentUser } from "@clerk/nextjs"  
import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"
import { stripe } from "@/lib/stripe"

import { absoluteUrl } from "@/lib/utils"

const settingsUrl = absoluteUrl("/settings")

export async function GET() {
    try {
        const { userId } = auth()
        const user = await currentUser()
        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const userSubscription = await prismadb.userSubscription.findFirst({
            where: {
                userId
            }
        })

        // Existing Customer
        if (userSubscription && userSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingsUrl
            })

            return new NextResponse(JSON.stringify({ url: stripeSession.url })) 
        }

        // New Customer
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Vaut Premium",
                            description: "Unlock all Vaut features",
                        },
                        unit_amount: 10,
                        recurring: {
                            interval: "month"
                        },
                    },
                    quantity: 1
                }
            ],
            metadata: {
                userId // pass back the userId to the success_url to know who bought
            }
        })

        return new NextResponse(JSON.stringify({ url: stripeSession.url }))
    } catch (error) {
        console.error("[STRIPE_ERROR]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}
