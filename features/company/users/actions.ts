"use server"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { OrgUserFullSchemaType } from "./schemas"

export async function addOrgUser(
    inputs: OrgUserFullSchemaType,
) {
    return { message: "sfs" }
}
