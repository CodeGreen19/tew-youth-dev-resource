import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Suspense } from "react"
import { AppBreadcrumb } from "./app-breadcrumb"
import { AppSidebar } from "./app-sidebar"
import { wait } from "@/lib/utils"
import { getQueryClient } from "@/lib/tanstack-query/get-query-client"
import { getSideBarInfo } from "./data/queries"
import {
    dehydrate,
    HydrationBoundary,
} from "@tanstack/react-query"
import { AppSidebarSkeleton } from "./app-sidebar-skeleton"

export function AppLayout(props: LayoutProps<"/">) {
    return (
        <SidebarProvider>
            <Suspense fallback={<AppSidebarSkeleton />}>
                <AppSidebarShell />
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

async function AppSidebarShell() {
    const qc = getQueryClient()
    await qc.prefetchQuery({
        queryKey: ["sidebar-info"],
        queryFn: () => getSideBarInfo(),
    })
    await wait()
    return (
        <HydrationBoundary state={dehydrate(qc)}>
            <AppSidebar />
        </HydrationBoundary>
    )
}
