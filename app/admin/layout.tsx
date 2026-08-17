import { AdminLayout } from '@/features/admin/layout'
import React from 'react'

export default function layout(props: LayoutProps<"/">) {
    return (
        <AdminLayout {...props} />
    )
}
