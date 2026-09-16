import React from "react"
import { Page1View } from "../_components/page-1-view"
import { getTests } from "../_server/queries"

export default async function page() {
    const tests = await getTests()

    return <Page1View tests={tests} />
}
