import { z } from "zod";

// 1. Define the validation schema
export const loginSchema = z.object({
    email: z
        .email({ message: "Invalid email format" })
        .min(1, { message: "Email is required" })
        .trim()
        .toLowerCase(),

    password: z
        .string()
        .min(1, { message: "Password is required" })
        .min(8, { message: "Minimum 8 characters required" })
        .max(100, { message: "Maximum 100 characters allowed" })

});

// 2. Infer the TypeScript type from the schema
export type LoginSchemaType = z.infer<typeof loginSchema>;
