"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

export default function page() {
    return (
        <div>
            <Button
                onClick={async () => {
                    const res =
                        await authClient.signUp.email({
                            name: "ahmed",
                            email: "ahmed@gmail.com",
                            password: "ahmed123",
                        })
                    console.log(res)
                }}
            >
                Sign up
            </Button>
        </div>
    )
}
