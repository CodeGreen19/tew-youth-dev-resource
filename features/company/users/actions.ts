"use server"

import { db } from "@/drizzle/db"
import { auth } from "@/lib/auth"
import { uploadToCloudinary } from "@/lib/cloudinary/upload"
import { headers } from "next/headers"
import {
    orgUserFullSchema,
    OrgUserFullSchemaType,
} from "./schemas"

export async function addOrgUser(
    inputs: OrgUserFullSchemaType,
) {
    const { success, data } =
        orgUserFullSchema.safeParse(inputs)
    if (!success) {
        throw new Error("Invalid data")
    }
    const {
        name,
        email,
        password,
        profilePicture: profileFile,
        cv: cvFile,
        ...rest
    } = data

    const existUser = await db.query.users.findFirst({
        where: { email },
        columns: { id: true },
    })
    if (existUser) {
        throw new Error("User already exist")
    }

    const [profilePicture, cv] = await Promise.all([
        uploadToCloudinary(profileFile.croppedFile),
        cvFile && uploadToCloudinary(cvFile),
    ])
    const newUser = await auth.api.createUser({
        body: {
            name: data.name,
            email: data.email,
            password: data.password,
            data: { data: { profilePicture, cv, ...rest } },
        },
        headers: await headers(),
    })

    const res = await auth.api.addMember({
        body: {
            userId: newUser.user.id, // The user ID which represents the user to be added as a member. If `null` is provided, then it's expected to provide session headers.
            role: "employee" as unknown as "owner", // required, The role(s) to assign to the new member.
        },
        headers: await headers(),
    })

    return { message: "New user is created" }
}
