"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

export function BranchesPage() {
    const data = authClient.useSession()
    const org = authClient.useListOrganizations()
    const member = authClient.useActiveMember()
    console.log(data)
    console.log(org, "org")
    console.log(member, "meber")

    return (
        <div>
            {JSON.stringify(data, null, 2)}

            <Button
                onClick={() => {
                    authClient.organization.setActive({
                        organizationId:
                            "PcRO3HrGPnB7IsKK2F9LPaDptrNMGRpi",
                    })
                }}
            >
                Set action org
            </Button>
        </div>
    )
}
