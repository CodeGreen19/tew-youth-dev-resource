"use cache"
import { auth } from "@/lib/auth";

export async function getUsersDataByHeaders(headers: HeadersInit | undefined) {

    return await auth.api.listUsers({ query: {}, headers })
}