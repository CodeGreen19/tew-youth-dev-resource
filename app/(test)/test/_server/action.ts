"use server"

import { txDB } from "@/drizzle/db"
import { tests } from "@/drizzle/schema"

export async function action() {
    return txDB.transaction(async (tx) => {
        await tx
            .insert(tests)
            .values({ name: "test 6", code: "147" })

        await tx
            .insert(tests)
            .values({ name: "test 7", code: "147" })
        return { message: "success" }
    })
}
