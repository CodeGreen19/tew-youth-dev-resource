import { courseStatuses } from "@/constants/course"
import { z } from "zod"

const uploadedFileSchema = z.object({
    secureUrl: z.url(),
    publicId: z.string(),
    resourceType: z.string(),
    format: z.string(),
})

export const courseSchema = z.object({
    banner: z.instanceof(File, {
        error: "Banner is required",
    }),
    name: z
        .string()
        .min(1, "Name is required")
        .max(255, "Name must be 255 characters or less"),
    code: z
        .string()
        .min(1, "Code is required")
        .max(100, "Code must be 100 characters or less"),
    status: z.enum(courseStatuses),
    description: z.string().nullable(),
})

export const updateCourseSchema = courseSchema
    .omit({ banner: true })
    .extend({
        banner: z.instanceof(File).nullable(),
        existingBanner: uploadedFileSchema,
    })

export type CourseSchemaType = z.infer<typeof courseSchema>
export type UpdateCourseSchemaType = z.infer<
    typeof updateCourseSchema
>
