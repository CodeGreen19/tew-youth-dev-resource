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
    branchDetailsSchema,
    BranchDetailsSchemaType,
} from "../../schemas"
import { useOnboardingStore } from "../../hooks/use-onboarding-store"
import { useRouter } from "next/navigation"

export function BranchDetailsForm({
    nextStepId,
}: {
    nextStepId?: string
}) {
    const { nextStep } = useOnboardingStore()
    const router = useRouter()
    const defaultValues: BranchDetailsSchemaType = {
        branchName: "",
        branchMobile: "",
        branchEmail: "",
        branchAge: 0,
        noOfComputers: 1,
        nidPdf: null,
        another: null,
    }

    const form = useAppForm({
        defaultValues,
        validators: {
            onChange: branchDetailsSchema,
        },
        onSubmit: async ({ value }) => {
            console.log(value)
            nextStep(nextStepId, router.push)
        },
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Branch Details</CardTitle>
                <CardDescription>
                    Provide the basic information about your
                    branch.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    id="branch-details-form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit()
                    }}
                >
                    <FieldGroup>
                        <form.AppField
                            name="nidPdf"
                            children={(field) => (
                                <field.AvatarField label="Thumbnail" />
                            )}
                        />
                        <form.AppField
                            name="branchName"
                            children={(field) => (
                                <field.TextField
                                    label="Branch Name"
                                    placeholder="Enter branch name"
                                />
                            )}
                        />

                        <form.AppField
                            name="branchMobile"
                            children={(field) => (
                                <field.TextField
                                    label="Branch Mobile"
                                    placeholder="01XXXXXXXXX"
                                />
                            )}
                        />

                        <form.AppField
                            name="branchEmail"
                            children={(field) => (
                                <field.TextField
                                    label="Branch Email"
                                    placeholder="branch@example.com"
                                />
                            )}
                        />

                        <form.AppField
                            name="branchAge"
                            children={(field) => (
                                <field.NumberField
                                    label="Branch Age"
                                    placeholder="Enter branch age"
                                />
                            )}
                        />
                        <form.AppField
                            name="another"
                            children={(field) => (
                                <field.FileField
                                    label="Branch Age"
                                    accept={{
                                        "application/pdf": [
                                            ".pdf",
                                        ],
                                    }}
                                />
                            )}
                        />

                        <form.AppField
                            name="noOfComputers"
                            children={(field) => (
                                <field.NumberField
                                    label="Number of Computers"
                                    placeholder="Enter number of computers"
                                />
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}
