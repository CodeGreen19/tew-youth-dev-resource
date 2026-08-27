"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { authClient } from "@/lib/auth-client"

export default function page() {
    const session = authClient.useSession();
    return (
        <div>
            <Button onClick={async () => {
                const res = await authClient.signUp.email({ name: "Ahmed", email: "email@gmail.com", password: "passcode" });

                console.log(res);

                toast.add({ title: "signed in" })
            }}>Sign Up</Button>
            <div>
                {JSON.stringify(session.data?.user || null)}
            </div>
        </div>
    )
}
