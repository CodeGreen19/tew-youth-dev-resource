"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "./action"
import { authClient } from "@/lib/auth-client"

export default function page() {
    const res = authClient.useSession()
    return (
        <div>
            <Button
                onClick={async () => {
                    const res = await signIn()
                }}
            >
                Sign up
            </Button>
            {JSON.stringify(res)}
        </div>
    )
}
