"use server"

import { auth } from "@/lib/auth"
import { userSchema, UserSchemaType } from "./schemas"

export async function createUser(schema: UserSchemaType) {
    const inputs = userSchema.safeParse(schema)
    if (!inputs.success) {
        throw new Error("Error")
    }
    await auth.api.createUser({
        body: {
            ...inputs.data,
        },
    })
    return { message: "new user created" }
}

export async function updateUser(
    schema: UserSchemaType & { id: string },
) {
    const inputs = userSchema.safeParse(schema)
    if (!inputs.success) {
        throw new Error("Error")
    }
    await auth.api.adminUpdateUser({
        body: {
            userId: schema.id,
            data: { ...inputs.data },
        },
    })
    return { message: "user updated" }
}
