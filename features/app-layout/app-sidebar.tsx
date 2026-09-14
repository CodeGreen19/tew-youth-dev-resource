"use client"

import * as React from "react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarMenu,
    SidebarRail,
} from "@/components/ui/sidebar"
import { useSuspenseQuery } from "@tanstack/react-query"
import { getSideBarInfo } from "./data/queries"
import { AppSidebarHeader } from "./app-sidebar-header"
import { AppNavUser } from "./app-nav-user"

export function AppSidebar({
    ...props
}: React.ComponentProps<typeof Sidebar>) {
    const { data } = useSuspenseQuery({
        queryKey: ["sidebar-info"],
        queryFn: () => getSideBarInfo(),
    })

    return (
        <Sidebar {...props} variant="inset">
            <AppSidebarHeader />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        sidebar menu{" "}
                        {data.session.user.name}
                        {/* {navData.navMain.map((item) => (
                            <SidebarMenuItem
                                key={item.title}
                            >
                                <SidebarMenuButton className="font-medium uppercase text-muted-foreground hover:bg-transparent hover:text-muted-foreground">
                                    {item.title}
                                </SidebarMenuButton>
                                {item.items?.length ? (
                                    <SidebarMenuSub>
                                        {item.items.map(
                                            (item) => (
                                                <SidebarMenuSubItem
                                                    key={
                                                        item.title
                                                    }
                                                >
                                                    <SidebarMenuSubButton
                                                        className={cn(
                                                            "p-4 hover:bg-background/10 focus:bg-background/10 active:bg-background/10 rounded-full",
                                                            item.url.startsWith(
                                                                pathname,
                                                            )
                                                                ? "bg-background hover:bg-background focus:bg-background "
                                                                : "",
                                                        )}
                                                        render={
                                                            <Link
                                                                href={
                                                                    item.url
                                                                }
                                                            >
                                                                {
                                                                    item.title
                                                                }
                                                            </Link>
                                                        }
                                                    ></SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ),
                                        )}
                                    </SidebarMenuSub>
                                ) : null}
                            </SidebarMenuItem>
                        ))} */}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
            <SidebarFooter>
                footer
                <AppNavUser />
            </SidebarFooter>
        </Sidebar>
    )
}
