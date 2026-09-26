import { getNextEnrollmentNumbers } from "@/features/app/branch/students/utils"
import React from "react"

export default async function page() {
    const res = await getNextEnrollmentNumbers()
    return <div>{JSON.stringify(res)}</div>
}
