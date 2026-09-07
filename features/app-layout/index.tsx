import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Suspense } from "react"
import { AppBreadcrumb } from "./app-breadcrumb"
import { AppSidebar } from "./app-sidebar"

export function AppLayout(props: LayoutProps<"/">) {
    return (
        <SidebarProvider>
            <Suspense>
                <AppSidebar variant="inset" />
            </Suspense>
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-3">
                        <SidebarTrigger />
                        <Suspense>
                            <AppBreadcrumb />
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
