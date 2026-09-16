import { db } from "@/drizzle/db"
import { tests } from "@/drizzle/schema"
import { wait } from "@/lib/utils"
import { cacheTag } from "next/cache"
import { headers } from "next/headers"

export async function getTests() {
    const headersStore = await headers()
    return getTestsData({ headers: headersStore })
}
export async function getTestsData({
    headers,
}: {
    headers: HeadersInit
}) {
    "use cache"
    cacheTag("tests")
    // 1. Start the timer
    const startTime = performance.now()

    await wait(2000)
    // 2. End the timer
    const endTime = performance.now()
    const executionTime = endTime - startTime

    // 3. Log or track the result
    console.log(
        `[Server Action] Query took ${executionTime.toFixed(2)} ms`,
    )
    return await db.select().from(tests)
}

export async function getTestById(id: string) {
    "use server"
    return await db.query.tests.findFirst({ where: { id } })
}
export async function emptyQuery() {
    "use server"
    await wait()
    return { status: "ok" }
}
