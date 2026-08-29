import { ThemeProvider } from '@/components/theme-provider'
import { AdminLayout } from '@/features/admin/layout'

export default function layout(props: LayoutProps<"/">) {
    return (
        <ThemeProvider>
            <AdminLayout {...props} />
        </ThemeProvider>
    )
}
