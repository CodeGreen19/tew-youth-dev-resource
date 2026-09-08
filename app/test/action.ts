"use server"

import { uploadToCloudinary } from "@/lib/cloudinary/upload"

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
