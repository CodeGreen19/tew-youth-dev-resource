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
import { loginSchema, LoginSchemaType } from "../schemas"
import { toast } from "@/components/ui/toast"
import { useSelector } from "@tanstack/react-form"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export function LoginForm() {
    const router = useRouter()
    const defaultValues: LoginSchemaType = {
        email: "",
        password: "",
    }
    const form = useAppForm({
        defaultValues,
        validators: {
            onChange: loginSchema,
        },
        onSubmit: async ({ value }) => {
            const res = await authClient.signIn.email({
                ...value,
            })
            if (res.error) {
                toast.add({
                    title:
                        res.error.message ||
                        res.error.statusText,
                    type: "error",
                })
            }
            if (res.data) {
                toast.add({
                    title: "Logged in successfully",
                    type: "success",
                })
                router.push("/admin/dashboard")
            }
        },
    })
    const isSubmitting = useSelector(
        form.store,
        (state) => state.isSubmitting,
    )
    return (
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Enter your credentials to login in
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    id="login-form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit()
                    }}
                >
                    <FieldGroup>
                        <form.AppField
                            name="email"
                            children={(field) => (
                                <field.TextField
                                    label="Email Address"
                                    placeholder="Enter your email address"
                                />
                            )}
                        />
                        <form.AppField
                            name="password"
                            children={(field) => (
                                <field.TextField
                                    label="Password"
                                    placeholder="********"
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
                        form="login-form"
                    >
                        Submit
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}
