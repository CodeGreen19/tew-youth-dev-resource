import z from "zod"
import {
    academicInformationSchema,
    personalInformationSchema,
} from "../new-student/schemas"
import {
    avatarObjSchema,
    uploadedFileSchema,
} from "../../schemas"

export const updatedPersonalInformationSchema =
    personalInformationSchema.omit({ image: true }).extend({
        image: avatarObjSchema.nullable(),
        existingImage: uploadedFileSchema,
    })
export type UpdatedPersonalInformationSchemaType = z.infer<
    typeof updatedPersonalInformationSchema
>

export const updateStudentSchema = z.object({
    ...updatedPersonalInformationSchema.shape,

    academicInformation: z
        .array(academicInformationSchema)
        .min(
            1,
            "At least one academic qualification is required",
        ),
})

export type UpdateStudentSchemaType = z.infer<
    typeof updateStudentSchema
>
