import { z } from "zod"

// Part 1: Branch Details Schema
export const branchDetailsSchema = z.object({
    branchName: z
        .string()
        .min(3, "Minimum 3 characters required")
        .max(100, "Maximum 100 characters allowed"),
    branchMobile: z
        .string()
        .regex(
            /^(?:\+88|88)?01[3-9]\d{8}$/,
            "Invalid Bangladeshi mobile number",
        ),
    branchEmail: z.string("Invalid email address"),
    branchAge: z
        .number("Branch age must be a number")
        .min(0, "Age cannot be negative")
        .max(100, "Maximum age exceeded"),
    noOfComputers: z
        .number("Number of computers must be a number")
        .int("Must be a whole number")
        .min(1, "Minimum 1 computer required"),
    nidPdf: z.instanceof(File).nullable(),
    another: z.instanceof(File).nullable(),
})

// Part 2: Owner Info Schema
export const ownerInfoSchema = z.object({
    ownerName: z
        .string()
        .min(3, "Minimum 3 characters required")
        .max(100, "Maximum 100 characters allowed"),
    fatherName: z
        .string()
        .min(3, "Minimum 3 characters required")
        .max(100, "Maximum 100 characters allowed"),
    motherName: z
        .string()
        .min(3, "Minimum 3 characters required")
        .max(100, "Maximum 100 characters allowed"),
    bloodGroup: z.enum(
        ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        "Select a valid blood group",
    ),
    nidNo: z
        .string()
        .regex(
            /^(?:\d{10}|\d{13}|\d{17})$/,
            "NID must be 10, 13, or 17 digits",
        ),
    gender: z.enum(
        ["Male", "Female", "Other"],
        "Select a valid gender",
    ),
})

// Part 3: Address Details Schema
export const addressDetailsSchema = z.object({
    division: z.string().min(2, "Division is required"),
    district: z.string().min(2, "District is required"),
    upazila: z.string().min(2, "Upazila is required"),
    area: z
        .string()
        .min(3, "Area must be at least 3 characters"),
    postalCode: z
        .string()
        .regex(
            /^\d{4}$/,
            "Postal code must be exactly 4 digits",
        ),
})

// Part 4: Documents Schema
export const documentsSchema = z.object({
    electricityBillPdf: z.instanceof(File).nullable(),
    nidPdf: z.instanceof(File).nullable(),
    tradeLicensePdf: z.instanceof(File).nullable(),
})

// ==========================================
// 2. Merged Full Form Schema
// ==========================================

// export const branchApplicationSchema = branchDetailsSchema
//     .extend(ownerInfoSchema)
//     .extend(addressDetailsSchema)
//     .extend(documentsSchema)

// ==========================================
// 3. Inferred TypeScript Types
// ==========================================

export type BranchDetailsSchemaType = z.infer<
    typeof branchDetailsSchema
>
export type OwnerInfoSchemaType = z.infer<
    typeof ownerInfoSchema
>
export type AddressDetailsSchemaType = z.infer<
    typeof addressDetailsSchema
>
export type DocumentsSchemaType = z.infer<
    typeof documentsSchema
>

// export type BranchApplicationSchemaType = z.infer<
//     typeof branchApplicationSchema
// >
