"use server"

import { ValidationError } from "@/lib/error/error-constructor"
import { loginSchema, LoginSchemaType } from "./schemas"
import { auth } from "@/lib/auth"
import { message } from "@/lib/success/message"
import {
    forgotPasswordSchema,
    ForgotPasswordSchemaType,
} from "./schemas"
import {
    resetPasswordSchema,
    ResetPasswordSchemaType,
} from "./schemas"
import { headers } from "next/headers"

export async function login(value: LoginSchemaType) {
    const { success, data } = loginSchema.safeParse(value)
    if (!success) {
        throw new ValidationError()
    }

    await auth.api.signInEmail({
        body: data,
        headers: await headers(),
    })
    return message("Login Successfull")
}

export async function forgotPassword(
    value: ForgotPasswordSchemaType,
) {
    const { success, data } =
        forgotPasswordSchema.safeParse(value)

    if (!success) {
        throw new ValidationError()
    }

    await auth.api.requestPasswordReset({
        body: {
            email: data.email,
            redirectTo: "/reset-password",
        },
    })

    return message("Password reset link sent successfully")
}

type ResetPasswordInput = ResetPasswordSchemaType & {
    token: string
}

export async function resetPassword(
    value: ResetPasswordInput,
) {
    const { success, data } =
        resetPasswordSchema.safeParse(value)

    if (!success) {
        throw new ValidationError()
    }

    if (!value.token) {
        throw new ValidationError()
    }

    await auth.api.resetPassword({
        body: {
            newPassword: data.newPassword,
            token: value.token,
        },
    })

    return message("Password reset successfully")
}
