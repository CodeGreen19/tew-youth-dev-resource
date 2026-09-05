"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

export default function page() {
    return (
        <div>
            <Button
                onClick={async () => {
                    await authClient.signUp.email({
                        email: "ahmed@gmail.com",
                        name: "Ahmed",
                        password: "passcode",
                    })
                }}
            >
                Create Admin
            </Button>
        </div>
    )
}
