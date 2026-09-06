"use client"

import { useAppForm } from "@/components/form/use-app-form"
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
import { capitalize } from "@/lib/helpers"
import { useMutation } from "@tanstack/react-query"
import { createUser } from "../actions"
import { userSchema, UserSchemaType } from "../schemas"

export function UserForm({
    type,
    existedValue,
    onCancel,
    onSuccess,
}: {
    type: "UPDATE" | "ADD"
    existedValue?: UserSchemaType & { id: string }
    onCancel?: () => void
    onSuccess?: () => void
}) {
    const defaultValues: UserSchemaType = existedValue ?? {
        name: "",
        email: "",
        password: "",
        role: "moderator",
    }

    const addMutation = useMutation({
        mutationFn: createUser,
        onSuccess: ({ message }) => {
            toast.add({ title: message, type: "success" })
            onSuccess?.()
            form.reset()
        },
        onError: ({ message }) =>
            toast.add({ title: message, type: "error" }),
    })

    const form = useAppForm({
        defaultValues,
        validators: {
            onSubmit: userSchema,
        },
        onSubmit: async ({ value }) => {
            if (type === "ADD") {
                addMutation.mutate(value)
            }
        },
    })

    const isSubmitting = addMutation.isPending
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {type === "ADD"
                        ? "Add User"
                        : "Update Update"}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    id="user-form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit()
                    }}
                >
                    <FieldGroup>
                        <form.AppField
                            name="name"
                            children={(field) => (
                                <field.TextField label="full Name" />
                            )}
                        />
                        <form.AppField
                            name="email"
                            children={(field) => (
                                <field.TextField label="Email address" />
                            )}
                        />
                        <form.AppField
                            name="role"
                            children={(field) => (
                                <field.SelectField
                                    options={[
                                        "admin",
                                        "moderator",
                                        "manager",
                                    ].map((v) => ({
                                        label: capitalize(
                                            v,
                                        ),
                                        value: v,
                                    }))}
                                    label="Role"
                                />
                            )}
                        />
                        <form.AppField
                            name="password"
                            children={(field) => (
                                <field.TextField label="Password" />
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Field
                    className="justify-end"
                    orientation={"horizontal"}
                >
                    <Button
                        onClick={() => {
                            form.reset()
                            onCancel?.()
                        }}
                        variant={"ghost"}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={isSubmitting}
                        form={"user-form"}
                        type="submit"
                    >
                        {type === "ADD"
                            ? "Submit"
                            : " Update"}
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}
