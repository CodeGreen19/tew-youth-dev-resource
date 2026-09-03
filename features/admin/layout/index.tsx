import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AdminSidebar } from "./admin-sidebar";
import { AdminBreadcrumb } from "./admin-breadcrumb";
import { Suspense } from "react";

export function AdminLayout(props: LayoutProps<"/admin">) {
  return (
    <SidebarProvider>
      <Suspense>
        <AdminSidebar variant="inset" />
      </Suspense>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Suspense>
              <AdminBreadcrumb />
            </Suspense>
          </div>
        </header>
        <div className="p-6 pt-0 ">{props.children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
