"use server"
import { withPermission } from "@/lib/dal"
import {
    courseInformationSchema,
    CourseInformationSchemaType,
    studentSchema,
    StudentSchemaType,
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
    enrollments,
    studentAcademicQualifications,
    students,
} from "@/drizzle/schema"
import { eq } from "drizzle-orm"
import { deleteFromCloudinary } from "@/lib/cloudinary/delete"
import { updateTag } from "next/cache"
import { message } from "@/utils/message"
import { cleanupUploads } from "@/lib/cloudinary/cleanup-uploads"
import { getNextEnrollmentNumbers } from "./utils"

export const createStudent = withPermission(
    { students: ["create"] },
    async ({ org }, inputs: StudentSchemaType) => {
        const { success, data } =
            studentSchema.safeParse(inputs)

        if (!success) {
            throw new ValidationError()
        }

        const existEmail =
            await db.query.students.findFirst({
                where: { email: data.email },
            })

        if (existEmail) {
            throw new Error("Email already exists")
        }
        const existPhoneNumber =
            await db.query.students.findFirst({
                where: { mobile: data.mobile },
            })

        if (existPhoneNumber) {
            throw new Error("Phone number already exists")
        }

        const image = await uploadToCloudinary(
            data.image.croppedFile,
        )
        try {
            await txDB.transaction(async (tx) => {
                const [newStudent] = await tx
                    .insert(students)
                    .values({
                        ...data,
                        image,
                        organizationId: org.id,
                    })
                    .returning()

                // students academics
                await tx
                    .insert(studentAcademicQualifications)
                    .values(
                        data.academicInformation.map(
                            (a) => ({
                                ...a,
                                studentId: newStudent.id,
                            }),
                        ),
                    )
                // enroll in a course
                const numbers =
                    await getNextEnrollmentNumbers()

                await tx.insert(enrollments).values({
                    ...data,
                    studentId: newStudent.id,
                    ...numbers,
                })
            })
            return message(
                "New Student is Registered Successfully",
            )
        } catch (error) {
            await cleanupUploads([image]).catch(() =>
                console.log("Image deletion error"),
            )
            throw error
        }
    },
)

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

        updateTag("students")
        updateTag("paid-students")

        return {
            message: "Student updated successfully",
        }
    },
)
export const updateEnrollment = withPermission(
    { students: ["update"] },
    async (
        _,
        inputs: CourseInformationSchemaType & {
            enrollmentId: string
        },
    ) => {
        const { success, data } =
            courseInformationSchema.safeParse(inputs)

        if (!success) {
            throw new ValidationError()
        }
        await db
            .update(enrollments)
            .set(data)
            .where(eq(enrollments.id, inputs.enrollmentId))

        updateTag("students")
        updateTag("paid-students")

        return {
            message: "Student course updated successfully",
        }
    },
)

export const deleteStudent = withPermission(
    { students: ["delete"] },
    async (_, { studentId }: { studentId: string }) => {
        await db
            .delete(students)
            .where(eq(students.id, studentId))
        updateTag("students")
        updateTag("paid-students")
        return {
            message: "Student deleted successfully",
        }
    },
)

export const acceptPayment = withPermission(
    { students: ["update"] },
    async (
        _,

        {
            enrollmentId,
            paidAmount,
        }: { enrollmentId: string; paidAmount: number },
    ) => {
        await db
            .update(enrollments)
            .set({ paymentStatus: "paid", paidAmount })
            .where(eq(enrollments.id, enrollmentId))

        updateTag("students")
        updateTag("paid-students")

        return {
            message: "Student updated successfully",
        }
    },
)
