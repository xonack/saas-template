import { Button } from "@/components/ui/button";
import Link from "next/link"; 
import { UserButton } from "@clerk/nextjs";

const LandingPage = () => {
    return (
        <div className="h-screen">
            <h1>Landing Page (Unprotected)</h1>
            <div>
                <Link href="/sign-in">
                    <Button>Login</Button>
                </Link>
                <Link href="/sign-up">
                    <Button>Register</Button>
                </Link>
            </div>
            <UserButton afterSignOutUrl="/"/>
        </div>
    );
}
export default LandingPage;