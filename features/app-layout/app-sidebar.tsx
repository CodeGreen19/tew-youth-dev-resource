"use client"

import * as React from "react"
import { GalleryVerticalEnd } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { navData } from "../constants"
import { authClient } from "@/lib/auth-client"
import { AppNavUser } from "./app-nav-user"

export function AppSidebar({
    ...props
}: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()
    const session = authClient.useSession()
    const org = authClient.useActiveOrganization()

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            render={
                                <div>
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-background text-sidebar-background-foreground bg-primary text-background">
                                        <GalleryVerticalEnd className="size-4" />
                                    </div>
                                    <div className="flex flex-col gap-0.5 leading-none">
                                        <span className="font-medium text-lg">
                                            {org.data?.name}
                                        </span>
                                    </div>
                                </div>
                            }
                        ></SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {navData.navMain.map((item) => (
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
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
            <SidebarFooter>
                <AppNavUser
                    isPending={session.isPending}
                    user={{
                        name: session.data?.user.name,
                        email: session.data?.user.email,
                    }}
                />
            </SidebarFooter>
        </Sidebar>
    )
}
