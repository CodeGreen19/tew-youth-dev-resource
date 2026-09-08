"use client"

import { useAppForm } from "@/components/form/use-app-form"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { FieldGroup } from "@/components/ui/field"
import {
    addressDetailsSchema,
    AddressDetailsSchemaType,
} from "../../schemas"
import { useRouter } from "next/navigation"
import { useOnboardingStore } from "../../hooks/use-onboarding-store"

export function AddressDetailsForm({
    nextStepId,
}: {
    nextStepId?: string
}) {
    const { nextStep } = useOnboardingStore()
    const router = useRouter()
    const defaultValues: AddressDetailsSchemaType = {
        division: "",
        district: "",
        upazila: "",
        area: "",
        postalCode: "",
    }

    const form = useAppForm({
        defaultValues,
        validators: {
            onChange: addressDetailsSchema,
        },
        onSubmit: async ({ value }) => {
            console.log(value)
            nextStep(nextStepId, router.push)
        },
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Address Details</CardTitle>
                <CardDescription>
                    Provide the complete address of the
                    branch.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    id="address-details-form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit()
                    }}
                >
                    <FieldGroup>
                        <form.AppField
                            name="division"
                            children={(field) => (
                                <field.TextField
                                    label="Division"
                                    placeholder="Enter division"
                                />
                            )}
                        />

                        <form.AppField
                            name="district"
                            children={(field) => (
                                <field.TextField
                                    label="District"
                                    placeholder="Enter district"
                                />
                            )}
                        />

                        <form.AppField
                            name="upazila"
                            children={(field) => (
                                <field.TextField
                                    label="Upazila"
                                    placeholder="Enter upazila"
                                />
                            )}
                        />

                        <form.AppField
                            name="area"
                            children={(field) => (
                                <field.TextField
                                    label="Area"
                                    placeholder="Enter area/village"
                                />
                            )}
                        />

                        <form.AppField
                            name="postalCode"
                            children={(field) => (
                                <field.TextField
                                    label="Postal Code"
                                    placeholder="Enter 4-digit postal code"
                                />
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}
