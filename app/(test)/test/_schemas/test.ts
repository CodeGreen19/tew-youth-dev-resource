import { z } from "zod"

export const testSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Test name is required")
        .max(15, "Test name must be 15 characters or less"),

    code: z
        .string()
        .trim()
        .min(1, "Test code is required")
        .max(
            100,
            "Test code must be 100 characters or less",
        ),

    description: z
        .string()
        .trim()
        .max(
            1000,
            "Description must be 1000 characters or less",
        ),
})

export type TestSchemaType = z.infer<typeof testSchema>
