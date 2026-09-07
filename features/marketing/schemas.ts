import { z } from "zod"

// 1. Define the validation schema
export const branchApplicationSchema = z.object({
    branchName: z
        .string()
        .min(3, "Minimum 3 characters required")
        .max(100, "Maximum 100 characters allowed"),

    ownerName: z
        .string()
        .min(3, "Minimum 3 characters required")
        .max(100, "Maximum 100 characters allowed"),
})

// 2. Infer the TypeScript type from the schema
export type BranchApplicationSchemaType = z.infer<
    typeof branchApplicationSchema
>
