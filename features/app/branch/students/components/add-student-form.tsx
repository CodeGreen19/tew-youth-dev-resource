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
import { addStudent } from "../actions"
import {
    studentSchema,
    StudentSchemaType,
} from "../schemas"

export function AddStudentForm({
    onCancel,
    onSuccess,
}: {
    onCancel?: () => void
    onSuccess?: () => void
}) {
    const defaultValues: StudentSchemaType = {
        name: "",
    }

    const addMutation = useMutation({
        mutationFn: addStudent,
        onSuccess: ({ message }) => {
            toast.add({
                title: message,
                type: "success",
            })
            onSuccess?.()
            form.reset()
        },
        onError: ({ message }) =>
            toast.add({
                title: message,
                type: "error",
            }),
    })

    const form = useAppForm({
        defaultValues,
        validators: {
            onSubmit: studentSchema,
        },
        onSubmit: async ({ value }) => {
            addMutation.mutate(value)
        },
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add Student</CardTitle>
            </CardHeader>

            <CardContent>
                <form
                    id="student-form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit()
                    }}
                >
                    <FieldGroup>
                        <form.AppField
                            name="name"
                            children={(field) => (
                                <field.TextField label="Student Name" />
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
                        onClick={() => {
                            form.reset()
                            onCancel?.()
                        }}
                        variant="ghost"
                    >
                        Cancel
                    </Button>

                    <SubmitButton
                        isPending={addMutation.isPending}
                        form="student-form"
                        type="submit"
                    >
                        Submit
                    </SubmitButton>
                </Field>
            </CardFooter>
        </Card>
    )
}
