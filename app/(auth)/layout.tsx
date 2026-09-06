import { AuthLayout } from "@/features/auth/layout"

export default function layout(props: LayoutProps<"/">) {
    return <AuthLayout {...props} />
}
