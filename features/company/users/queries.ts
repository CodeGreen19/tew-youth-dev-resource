"use server"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function getUsers() {
    return await auth.api.listUsers({
        query: {},
        headers: await headers(),
    })
}
