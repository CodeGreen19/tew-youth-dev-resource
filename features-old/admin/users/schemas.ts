import { z } from "zod"

export const userSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
    name: z.string().min(1),
    role: z.enum(["admin", "moderator", "manager"]),
})

export type UserSchemaType = z.infer<typeof userSchema>
