"use server"
import { withPermission } from "@/lib/dal"
import {
    updateStudentSchema,
    UpdateStudentSchemaType,
} from "./schemas"
import {
    NotFoundError,
    ValidationError,
} from "@/utils/error-constructor"
import { db, txDB } from "@/drizzle/db"
import { uploadToCloudinary } from "@/lib/cloudinary/upload"
import {
    studentAcademicQualifications,
    students,
} from "@/drizzle/schema"
import { eq } from "drizzle-orm"
import { deleteFromCloudinary } from "@/lib/cloudinary/delete"
import { updateTag } from "next/cache"

export const updateStudent = withPermission(
    { students: ["update"] },
    async (
        _,
        inputs: UpdateStudentSchemaType & {
            enrollmentId: string
        },
    ) => {
        const { success, data } =
            updateStudentSchema.safeParse(inputs)

        if (!success) {
            throw new ValidationError()
        }

        const enrollment =
            await db.query.enrollments.findFirst({
                where: { id: inputs.enrollmentId },
                columns: { id: true },
                with: {
                    student: { columns: { id: true } },
                },
            })

        if (!enrollment) {
            throw new NotFoundError()
        }

        if (!enrollment.student) {
            throw new NotFoundError(
                "Student linked to this enrollment was not found",
            )
        }

        const studentId = enrollment.student.id

        const existEmail =
            await db.query.students.findFirst({
                where: {
                    AND: [
                        { email: data.email },
                        { NOT: { id: studentId } },
                    ],
                },
            })

        if (existEmail) {
            throw new Error("Email already exists")
        }
        const existPhoneNumber =
            await db.query.students.findFirst({
                where: {
                    AND: [
                        { mobile: data.mobile },
                        { NOT: { id: studentId } },
                    ],
                },
            })

        if (existPhoneNumber) {
            throw new Error("Phone number already exists")
        }

        let image = data.existingImage
        let newImagePublicId: string | undefined

        if (data.image && data.image.croppedFile.size > 0) {
            const uploadedImage = await uploadToCloudinary(
                data.image.croppedFile,
            )

            image = uploadedImage
            newImagePublicId = uploadedImage?.publicId
        }

        try {
            await txDB.transaction(async (tx) => {
                await tx
                    .update(students)
                    .set({
                        ...data,
                        image,
                    })
                    .where(eq(students.id, studentId))

                // delete all the qualification
                await tx
                    .delete(studentAcademicQualifications)
                    .where(
                        eq(
                            studentAcademicQualifications.studentId,
                            studentId,
                        ),
                    )

                if (data.academicInformation.length > 0) {
                    await tx
                        .insert(
                            studentAcademicQualifications,
                        )
                        .values(
                            data.academicInformation.map(
                                (qualification) => ({
                                    ...qualification,
                                    studentId,
                                }),
                            ),
                        )
                }
            })
        } catch (error) {
            if (newImagePublicId) {
                await deleteFromCloudinary(
                    newImagePublicId,
                ).catch(() => {
                    console.log("Image deletion error")
                })
            }

            throw error
        }

        if (
            data.image &&
            data.image.croppedFile.size > 0 &&
            data.existingImage?.publicId
        ) {
            await deleteFromCloudinary(
                data.existingImage.publicId,
            ).catch(() => {
                console.error(
                    "Failed to delete old student image",
                )
            })
        }

        updateTag("paid-students")

        return {
            message: "Student updated successfully",
        }
    },
)
