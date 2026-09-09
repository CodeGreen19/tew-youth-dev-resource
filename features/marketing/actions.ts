"use server"

import { db } from "@/drizzle/db"
import {
    branchApplicationSchema,
    BranchApplicationSchemaType,
} from "./schemas"
import { branchApplications } from "@/drizzle/schema"
import { uploadToCloudinary } from "@/lib/cloudinary/upload"

export async function applyForBranch(
    inputs: BranchApplicationSchemaType,
) {
    const { data, success } =
        branchApplicationSchema.safeParse(inputs)
    if (!success) {
        throw new Error("Invalid Data")
    }

    const [
        electricityBill,
        nidDocument,
        tradeLicense,
        logo,
    ] = await Promise.all([
        uploadToCloudinary(data.electricityBill),
        uploadToCloudinary(data.nidDocument),
        uploadToCloudinary(data.tradeLicense),
        data.logo && uploadToCloudinary(data.logo),
    ])
    await db.insert(branchApplications).values({
        ...data,
        electricityBill,
        nidDocument,
        tradeLicense,
        logo,
    })
    return {
        message: "Your form has submitted successfully",
    }
}
