"use server"

import { db, txDB } from "@/drizzle/db"
import {
    enrollments,
    studentAcademicQualifications,
    students,
} from "@/drizzle/schema"
import { auth } from "@/lib/auth"
import { cleanupUploads } from "@/lib/cloudinary/cleanup-uploads"
import { uploadToCloudinary } from "@/lib/cloudinary/upload"
import { withPermission } from "@/lib/dal"
import {
    NotFoundError,
    ValidationError,
} from "@/utils/error-constructor"
import { message } from "@/utils/message"
import { studentSchema, StudentSchemaType } from "./schemas"
import { generateEnrollmentNumbers } from "./utils"

export const createStudent = withPermission(
    { students: ["create"] },
    async ({ headers }, inputs: StudentSchemaType) => {
        const { success, data } =
            studentSchema.safeParse(inputs)

        if (!success) {
            throw new ValidationError()
        }

        const org = await auth.api.getOrganization({
            headers,
        })

        if (!org) {
            throw new NotFoundError("Org not found")
        }

        const existUser = await db.query.students.findFirst(
            {
                where: { email: data.email },
                columns: { id: true },
            },
        )

        if (existUser) {
            throw new Error("Email already exists")
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
                    await generateEnrollmentNumbers()

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
