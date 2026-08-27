"use client"

import { useAppForm } from '@/components/form/use-app-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup } from '@/components/ui/field'
import { loginSchema, LoginSchemaType } from '../schemas/admin'
import { toast } from '@/components/ui/toast'
import { useSelector } from '@tanstack/react-form'

export function AdminLoginForm() {
    const defaultValues: LoginSchemaType = { email: "", password: "" }
    const form = useAppForm({
        defaultValues,
        validators: {
            onBlur: loginSchema,
            onChange: loginSchema,
            onSubmit: loginSchema
        },
        onSubmit: async ({ value }) => {
            await new Promise(res => setTimeout(res, 2000));
            toast.add({ title: "Works fine" })
        }
    })
    const isSubmitting = useSelector(form.store, (state) => state.isSubmitting);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Admin Login</CardTitle>
                <CardDescription>Enter your credentials to login in</CardDescription>
            </CardHeader>
            <CardContent>
                <form id='admin-login-form' onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}>
                    <FieldGroup>
                        <form.AppField name='email' children={(field) => <field.TextField label='Email Address' placeholder='Enter your email address' />} />
                        <form.AppField name='password' children={(field) => <field.TextField label='Password' placeholder='********' />} />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Field>
                    <Button disabled={isSubmitting} type='submit' form='admin-login-form' >Submit</Button>
                </Field>
            </CardFooter>
        </Card>
    )
}
