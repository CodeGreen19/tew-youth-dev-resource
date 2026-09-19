import { z } from "zod"

export const studentSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required")
        .max(255, "Name must be 255 characters or less"),
})

export type StudentSchemaType = z.infer<
    typeof studentSchema
>
