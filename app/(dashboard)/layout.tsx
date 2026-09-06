import { DashboardLayout } from "@/features/dashboard-layout"
import React from "react"

export default function layout(props: LayoutProps<"/">) {
    return <DashboardLayout {...props} />
}
