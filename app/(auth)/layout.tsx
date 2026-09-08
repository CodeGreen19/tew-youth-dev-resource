import { AuthLayout } from "@/features/auth/layout"
import React from "react"

export default function layout(props: LayoutProps<"/">) {
    return <AuthLayout {...props} />
}
