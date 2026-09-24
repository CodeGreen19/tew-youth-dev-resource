"use client"

import {
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { GalleryVerticalEnd } from "lucide-react"
import { SidebarDataType } from "../types"

export function AppSidebarHeader({
    data,
}: {
    data: SidebarDataType
}) {
    return (
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        size="lg"
                        render={
                            <div>
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-background">
                                    <GalleryVerticalEnd className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-medium text-lg">
                                        {data.org.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground capitalize">
                                        {data.orgRole}
                                    </span>
                                </div>
                            </div>
                        }
                    ></SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
    )
}
