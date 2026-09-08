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
    ownerInfoSchema,
    OwnerInfoSchemaType,
} from "../../schemas"
import { useOnboardingStore } from "../../hooks/use-onboarding-store"
import { useRouter } from "next/navigation"

export function OwnerInfoForm({
    nextStepId,
}: {
    nextStepId?: string
}) {
    const { nextStep } = useOnboardingStore()
    const router = useRouter()
    const defaultValues: OwnerInfoSchemaType = {
        ownerName: "",
        fatherName: "",
        motherName: "",
        bloodGroup: "A+",
        nidNo: "",
        gender: "Male",
    }

    const form = useAppForm({
        defaultValues,
        validators: {
            onChange: ownerInfoSchema,
        },
        onSubmit: async ({ value }) => {
            console.log(value)
            nextStep(nextStepId, router.push)
        },
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Owner Information</CardTitle>
                <CardDescription>
                    Provide the personal information of the
                    branch owner.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    id="owner-info-form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit()
                    }}
                >
                    <FieldGroup>
                        <form.AppField
                            name="ownerName"
                            children={(field) => (
                                <field.TextField
                                    label="Owner Name"
                                    placeholder="Enter owner's full name"
                                />
                            )}
                        />

                        <form.AppField
                            name="fatherName"
                            children={(field) => (
                                <field.TextField
                                    label="Father's Name"
                                    placeholder="Enter father's name"
                                />
                            )}
                        />

                        <form.AppField
                            name="motherName"
                            children={(field) => (
                                <field.TextField
                                    label="Mother's Name"
                                    placeholder="Enter mother's name"
                                />
                            )}
                        />

                        <form.AppField
                            name="nidNo"
                            children={(field) => (
                                <field.TextField
                                    label="NID Number"
                                    placeholder="Enter NID number"
                                />
                            )}
                        />

                        <form.AppField
                            name="bloodGroup"
                            children={(field) => (
                                <field.SelectField
                                    label="Blood Group"
                                    placeholder="Select blood group"
                                    options={[
                                        {
                                            label: "A+",
                                            value: "A+",
                                        },
                                        {
                                            label: "A-",
                                            value: "A-",
                                        },
                                        {
                                            label: "B+",
                                            value: "B+",
                                        },
                                        {
                                            label: "B-",
                                            value: "B-",
                                        },
                                        {
                                            label: "AB+",
                                            value: "AB+",
                                        },
                                        {
                                            label: "AB-",
                                            value: "AB-",
                                        },
                                        {
                                            label: "O+",
                                            value: "O+",
                                        },
                                        {
                                            label: "O-",
                                            value: "O-",
                                        },
                                    ]}
                                />
                            )}
                        />

                        <form.AppField
                            name="gender"
                            children={(field) => (
                                <field.SelectField
                                    label="Gender"
                                    placeholder="Select gender"
                                    options={[
                                        {
                                            label: "Male",
                                            value: "Male",
                                        },
                                        {
                                            label: "Female",
                                            value: "Female",
                                        },
                                        {
                                            label: "Other",
                                            value: "Other",
                                        },
                                    ]}
                                />
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}
