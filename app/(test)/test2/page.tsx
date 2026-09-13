import React from "react"
import { getTest2 } from "./_server/action"

export default async function page() {
    await getTest2()
    return <div>Date is loaded</div>
}
