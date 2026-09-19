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
import { updateStudent } from "../actions"
import {
    studentSchema,
    StudentSchemaType,
} from "../schemas"

export function UpdateStudentForm({
    existedValue,
}: {
    existedValue: StudentSchemaType & {
        id: string
    }
}) {
    const router = useRouter()

    const updateMutation = useMutation({
        mutationFn: updateStudent,
        onSuccess: ({ message }) => {
            toast.add({
                title: message,
                type: "success",
            })
            router.push("/dashboard/students")
        },
        onError: ({ message }) =>
            toast.add({
                title: message,
                type: "error",
            }),
    })

    const form = useAppForm({
        defaultValues: {
            name: existedValue.name,
        },
        validators: {
            onSubmit: studentSchema,
        },
        onSubmit: async ({ value }) => {
            updateMutation.mutate({
                id: existedValue.id,
                ...value,
            })
        },
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Update Student</CardTitle>
            </CardHeader>

            <CardContent>
                <form
                    id="update-student-form"
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
                        onClick={() =>
                            router.push(
                                "/dashboard/students",
                            )
                        }
                        variant="ghost"
                    >
                        Cancel
                    </Button>

                    <SubmitButton
                        isPending={updateMutation.isPending}
                        form="update-student-form"
                        type="submit"
                    >
                        Update
                    </SubmitButton>
                </Field>
            </CardFooter>
        </Card>
    )
}
