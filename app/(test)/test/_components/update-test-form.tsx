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
import { useRouter } from "next/navigation"
import {
    testSchema,
    TestSchemaType,
} from "../_schemas/test"
import { updateTest } from "../_server/action"
import { getQueryClient } from "@/lib/tanstack-query/get-query-client"

export function UpdateTestForm({
    testId,
    defaultValues,
    returnTo,
}: {
    testId: string
    defaultValues: TestSchemaType
    returnTo: string
}) {
    const router = useRouter()
    const qc = getQueryClient()

    const form = useAppForm({
        defaultValues,
        validators: {
            onSubmit: testSchema,
        },
        onSubmit: async ({ value }) => {
            updateMutation.mutate(value)
        },
    })

    const updateMutation = useMutation({
        mutationFn: (value: TestSchemaType) =>
            updateTest({ id: testId, input: value }),
        onSuccess: ({ message }) => {
            toast.add({
                title: message,
                type: "success",
            })
            qc.invalidateQueries({
                queryKey: ["advanced-tests"],
            })
            router.push(returnTo)
            router.refresh()
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
                <CardTitle>Update Test</CardTitle>
            </CardHeader>

            <CardContent>
                <form
                    id="update-test-form"
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
                        onClick={() =>
                            router.push(returnTo)
                        }
                    >
                        Cancel
                    </Button>

                    <SubmitButton
                        isPending={updateMutation.isPending}
                        form="update-test-form"
                        type="submit"
                    >
                        Update
                    </SubmitButton>
                </Field>
            </CardFooter>
        </Card>
    )
}
