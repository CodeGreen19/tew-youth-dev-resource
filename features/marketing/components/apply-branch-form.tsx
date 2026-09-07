"use client"

import { useAppForm } from "@/components/form/use-app-form"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup } from "@/components/ui/field"
import { toast } from "@/components/ui/toast"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { applyForBranch } from "../actions"
import {
    branchApplicationSchema,
    BranchApplicationSchemaType,
} from "../schemas"

export function ApplyBranchForm() {
    const router = useRouter()
    const defaultValues: BranchApplicationSchemaType = {
        ownerName: "",
        branchName: "",
    }

    const applyBranchMutation = useMutation({
        mutationFn: applyForBranch,
        onSuccess: ({ message }) => {
            toast.add({ title: message, type: "success" })

            form.reset()
        },
        onError: ({ message }) =>
            toast.add({ title: message, type: "error" }),
    })
    const form = useAppForm({
        defaultValues,
        validators: {
            onChange: branchApplicationSchema,
        },
        onSubmit: async ({ value }) =>
            applyBranchMutation.mutate(value),
    })
    const isSubmitting = applyBranchMutation.isPending
    return (
        <Card>
            <CardHeader>
                <CardTitle>Branch</CardTitle>
                <CardDescription>
                    Enter your branch details
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    id="branch-form"
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
                                    placeholder="Enter owner name"
                                />
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
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Field>
                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        form="branch-form"
                    >
                        Submit
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}
