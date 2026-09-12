import { GENDER } from "@/features/marketing/constants"
import {
    avatarObjSchema,
    avaterObjDefaults,
} from "@/features/schemas"
import { z } from "zod"

// ─────────────────────────────────────────────
// Part 1: Required Personal & Account Info
// ─────────────────────────────────────────────

export const orgUserSchema = z.object({
    profilePicture: avatarObjSchema,

    name: z
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(100, "Name must not exceed 100 characters"),

    email: z.string().email("Enter a valid email address"), // Fixed syntax error: z.string().email()

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(
            100,
            "Password must not exceed 100 characters",
        ),

    phoneNumber: z
        .string()
        .regex(
            /^(?:\+88|88)?01[3-9]\d{8}$/,
            "Enter a valid Bangladeshi phone number",
        ),

    gender: z.enum(GENDER, {
        message: "Please select a valid gender",
    }), // Fixed invalid direct string argument on z.enum
})

// ─────────────────────────────────────────────
// Part 2: Optional Info (Address, CV, Experience)
// ─────────────────────────────────────────────

export const orgUserAdditionalSchema = z.object({
    address: z.string().optional(),
    fatherName: z
        .string()
        .min(
            3,
            "Father's name must be at least 3 characters",
        )
        .max(
            100,
            "Father's name must not exceed 100 characters",
        ),

    motherName: z
        .string()
        .min(
            3,
            "Mother's name must be at least 3 characters",
        )
        .max(
            100,
            "Mother's name must not exceed 100 characters",
        ),

    cv: z.instanceof(File).nullable(),

    qualification: z
        .string()
        .max(
            1000,
            "Qualification details must not exceed 1000 characters",
        )
        .optional(),
})

// ─────────────────────────────────────────────
// Complete Organization User Schema
// ─────────────────────────────────────────────

export const orgUserFullSchema = z.object({
    ...orgUserSchema.shape,
    ...orgUserAdditionalSchema.shape,
})

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type OrgUserSchemaType = z.infer<
    typeof orgUserSchema
>

export type OrgUserAdditionalSchemaType = z.infer<
    typeof orgUserAdditionalSchema
>

export type OrgUserFullSchemaType = z.infer<
    typeof orgUserFullSchema
>

// ─────────────────────────────────────────────
// Default Values
// ─────────────────────────────────────────────

export const orgUserFullDefaults: OrgUserFullSchemaType = {
    // Required Fields
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    fatherName: "",
    motherName: "",
    profilePicture: avaterObjDefaults,
    gender: "Male", // Note: Ensure "Male" exists inside your GENDER array constants

    // Optional Fields
    address: "",
    cv: null,
    qualification: "",
}
