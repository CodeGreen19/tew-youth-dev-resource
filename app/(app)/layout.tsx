import { AppLayout } from "@/features/app-layout"
import React from "react"

export default function layout(props: LayoutProps<"/">) {
    return <AppLayout {...props} />
}
