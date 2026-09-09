"use server"

import { auth } from "@/lib/auth"
import { uploadToCloudinary } from "@/lib/cloudinary/upload"
import { headers } from "next/headers"

export async function upload(file: File) {
    return await uploadToCloudinary(file, {
        folder: "Testing",
        resourceType: "image",
    })
}
export async function uploadPdf(file: File) {
    return await uploadToCloudinary(file, {
        folder: "Testing",
        resourceType: "image",
    })
}

export async function signIn() {
    return await auth.api.signUpEmail({
        body: {
            name: "ahmed4",
            email: "ahmed4@gmail.com",
            password: "ahmed123",
        },
        headers: await headers(),
    })
}
