"use client"

import axios from "axios";
import { Zap } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button"

interface SubscriptionButtonProps {
    isPremium: boolean;
}

export const SubscriptionButton = ({
    isPremium = false
}: SubscriptionButtonProps) => {
    const [loading, setLoading] = useState(false)

    const onClick = async () => {
        try {
            setLoading(true)
            const response = await axios.get("/api/stripe")

            window.location.href = response.data.url
        } catch (error) {
            console.log(error, "BILLING ERROR")
        } finally {
            setLoading(false)
        }
    }
    return (
        <Button
            onClick={onClick}
            disabled={loading}
            variant={isPremium ? "default" : "premium"}
        >
            {isPremium ? "Manage Subscription" : "Upgrade to Premium"}
            {!isPremium && <Zap className="w-4 h-4 ml-2 fill-yellow-400"/>}
        </Button>
    );
}