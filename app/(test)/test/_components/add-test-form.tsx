"use client"

import { useAppForm } from "@/components/form/use-app-form"
import { SubmitButton } from "@/components/shared/submit-button"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup } from "@/components/ui/field"
import { toast } from "@/components/ui/toast"
import { useMutation } from "@tanstack/react-query"
import {
    testSchema,
    TestSchemaType,
} from "../_schemas/test"
import { addTest } from "../_server/action"
import { getQueryClient } from "@/lib/tanstack-query/get-query-client"

export function AddTestForm({
    onCancel,
    onSuccess,
}: {
    onCancel?: () => void
    onSuccess?: () => void
}) {
    const qc = getQueryClient()
    const defaultValues: TestSchemaType = {
        name: "",
        code: "",
        description: "",
    }

    const form = useAppForm({
        defaultValues,
        validators: {
            onSubmit: testSchema,
        },
        onSubmit: async ({ value }) => {
            addMutation.mutate(value)
        },
    })

    const addMutation = useMutation({
        mutationFn: addTest,
        onSuccess: ({ message }) => {
            toast.add({
                title: message,
                type: "success",
            })
            qc.invalidateQueries({
                queryKey: ["advanced-tests"],
            })
            form.reset()
            onSuccess?.()
        },
        onError: (error) => {
            toast.add({
                title: error.message,
                type: "error",
            })
        },
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add Test</CardTitle>
            </CardHeader>

            <CardContent>
                <form
                    id="test-form"
                    onSubmit={(event) => {
                        event.preventDefault()
                        form.handleSubmit()
                    }}
                >
                    <FieldGroup>
                        <form.AppField
                            name="name"
                            children={(field) => (
                                <field.TextField label="Test Name" />
                            )}
                        />

                        <form.AppField
                            name="code"
                            children={(field) => (
                                <field.TextField label="Test Code" />
                            )}
                        />

                        <form.AppField
                            name="description"
                            children={(field) => (
                                <field.TextareaField label="Description" />
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>

            <CardFooter>
                <Field
                    className="justify-end"
                    orientation="horizontal"
                >
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                            form.reset()
                            onCancel?.()
                        }}
                    >
                        Cancel
                    </Button>

                    <SubmitButton
                        isPending={addMutation.isPending}
                        form="test-form"
                        type="submit"
                    >
                        Submit
                    </SubmitButton>
                </Field>
            </CardFooter>
        </Card>
    )
}
