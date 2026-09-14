import * as React from "react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"
import { cn, wait } from "@/lib/utils"
import Link from "next/link"
// import { usePathname } from "next/navigation"
import { navData } from "../constants"
import { AppNavUser } from "./app-nav-user"
import { AppSidebarHeader } from "./app-sidebar-header"

export async function AppSidebar({
    ...props
}: React.ComponentProps<typeof Sidebar>) {
    // const pathname = usePathname()
    // const session = authClient.useSession()
    // const org = authClient.useActiveOrganization();
    // await wait()
    return (
        <Sidebar {...props}>
            {/* <AppSidebarHeader /> */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        sidebar menu
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
                {/* <AppNavUser
                    isPending={session.isPending}
                    user={{
                        name: session.data?.user.name,
                        email: session.data?.user.email,
                        role: session.data?.user.role,
                    }}
                /> */}
            </SidebarFooter>
        </Sidebar>
    )
}
