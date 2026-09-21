"use server"

import { db } from "@/drizzle/db"
import { branchApplications } from "@/drizzle/schema"
import { auth } from "@/lib/auth"
import { NotFoundError } from "@/utils/error-constructor"
import { generatePassword } from "@/utils/helpers"
import { eq } from "drizzle-orm"
import { headers as nextHeaders } from "next/headers"

import { message } from "@/utils/message"
import { createUniqueOrgSlug } from "../branch-applications/utils"

export async function approveApplication({
    applicationId,
}: {
    applicationId: string
}) {
    await db
        .update(branchApplications)
        .set({ status: "approved" })
        .where(eq(branchApplications.id, applicationId))
    return message("Status has changed to approved")
}
export async function rejectApplication({
    applicationId,
}: {
    applicationId: string
}) {
    await db
        .update(branchApplications)
        .set({ status: "rejected" })
        .where(eq(branchApplications.id, applicationId))
    return message("Status has changed to rejected")
}

export async function createNewBranchWorkspace({
    applicationId,
}: {
    applicationId: string
}) {
    const headers = await nextHeaders()
    const branchApplication =
        await db.query.branchApplications.findFirst({
            where: { id: applicationId },
        })
    if (!branchApplication) {
        throw new NotFoundError()
    }
    const {
        ownerName: name,
        email,
        branchName,
        logo,
    } = branchApplication
    const password = generatePassword()
    console.log("password", password)

    const newUser = await auth.api.createUser({
        body: {
            name,
            email,
            password,
            role: "admin",
        },
        headers,
    })
    const slug = await createUniqueOrgSlug(branchName)

    const newOrg = await auth.api.createOrganization({
        body: {
            name: branchName,
            slug,
            logo: logo?.secureUrl,
            userId: newUser.user.id,
            keepCurrentActiveOrganization: true,
        },
    })
    await db
        .update(branchApplications)
        .set({ organizationId: newOrg.id })

    return message("Workspace has been set up successfully")
}
