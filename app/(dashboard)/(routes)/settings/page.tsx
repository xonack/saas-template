import { Settings } from "lucide-react"

import { Heading } from "@/components/heading"
import { checkSubscription } from "@/lib/subscription"
import { SubscriptionButton } from "@/components/subscription-button"

const SettingsPage = async () => {
    const isPremium = await checkSubscription()

    return (
        <div>
            <Heading
                title="Settings"
                description="Manage your account settings."
                icon={Settings}
                iconColor="text-gray-700"
                bgColor="bg-gray-700/10"
            />
            <div className="px-4 lg:px-8 space-y-4">
                <div className="text-muted-foreground text-sm">
                    {isPremium ? "You are a premium user." : "You are a free user."}
                </div>
                <SubscriptionButton isPremium={isPremium} />
            </div>
        </div>
    )
}

export default SettingsPage