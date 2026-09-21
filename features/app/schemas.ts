import z from "zod"

export const avatarObjSchema = z.object({
    originalFile: z.instanceof(File, {
        message: "Profile picture is required", // Fixed syntax error from 'error' to 'message'
    }),
    croppedFile: z.instanceof(File, {
        message: "Profile picture is required", // Fixed syntax error from 'error' to 'message'
    }),
    x: z.number(),
    y: z.number(),
    zoom: z.number(),
})

export type AvaterObjSchema = z.infer<
    typeof avatarObjSchema
>
export const avaterObjDefaults: AvaterObjSchema = {
    originalFile: null as unknown as File,
    croppedFile: null as unknown as File,
    x: 0,
    y: 0,
    zoom: 1,
}

export const uploadedFileSchema = z.object({
    secureUrl: z.url(),
    publicId: z.string(),
    resourceType: z.string(),
    format: z.string(),
})
