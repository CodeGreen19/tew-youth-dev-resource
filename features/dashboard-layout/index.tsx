import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Suspense } from "react"
import { DashboardBreadcrumb } from "./dashboard-breadcrumb"
import { DashboardSidebar } from "./dashboard-sidebar"

export function DashboardLayout(props: LayoutProps<"/">) {
    return (
        <SidebarProvider>
            <Suspense>
                <DashboardSidebar variant="inset" />
            </Suspense>
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-3">
                        <SidebarTrigger />
                        <Suspense>
                            <DashboardBreadcrumb />
                        </Suspense>
                    </div>
                </header>
                <div className="p-6 pt-0 ">
                    {props.children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
