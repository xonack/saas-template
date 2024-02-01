"use client"

import { useAuth } from "@clerk/nextjs"
import TypewriterComponent from "typewriter-effect"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export const LandingHero = () => {
    const { isSignedIn } = useAuth()

    return (
        <div className="text-white font-bold py-36 text-center space-y-5">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl
            space-y-5 font-extrabold">
                <h1>
                    Virtual Automation Technologies
                </h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r
                from-zinc-400 to-blue-800">
                    <TypewriterComponent 
                        options={{
                            strings: [
                                "Automate your business",
                                "Automate your content",
                                "Automate your future"
                            ],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </div>
            </div>
            <div className="text-sm md:text-xl front-light text-white">
                Leverage AI for 100X productivity
            </div>
            <div>
                <Link href={isSignedIn ? "/dashboard": "/sign-up"}>
                    <Button className="text-black" variant="outline">
                        {isSignedIn ? "Dashboard" : "Free Trial"}
                    </Button>
                </Link>
            </div>
            <div className="text-zinc-400 text-xs md:text-sm font-normal">
                Wield the Power of Computation.
            </div>
        </div>
    )
}