"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import React from "react"

export default function page() {
    return (
        <div>
            <Button
                onClick={async () => {
                    const metadata = {
                        someKey: "someValue",
                    }
                    const { data, error } =
                        await authClient.organization.create(
                            {
                                name: "My Organization", // required, The organization name.
                                slug: "my-org", // required, The organization slug.
                                logo: "https://example.com/logo.png", // The organization logo.
                                metadata, // The metadata of the organization.
                                keepCurrentActiveOrganization: false, // Whether to keep the current active organization active after creating a new one.
                            },
                        )

                    console.log(data, error)
                }}
            >
                create organization
            </Button>
        </div>
    )
}
