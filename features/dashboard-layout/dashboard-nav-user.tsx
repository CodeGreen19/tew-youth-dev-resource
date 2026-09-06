"use client"

import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    Loader2,
    LogOut,
    Sparkles,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { authClient } from "@/lib/auth-client"
import { Badge } from "@/components/ui/badge"

export function DashboardNavUser({
    user,
    isPending,
}: {
    user: {
        name?: string
        email?: string
        avatar?: string
        role?: string | null
    }
    isPending: boolean
}) {
    const { isMobile } = useSidebar()

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                {isPending ? (
                    <SidebarMenuButtonSkeleton />
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            render={
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage
                                            src={
                                                user.avatar
                                            }
                                            alt={user.name}
                                        />
                                        <AvatarFallback className="rounded-lg">
                                            CN
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">
                                            {user.name}{" "}
                                            <Badge
                                                variant={
                                                    "secondary"
                                                }
                                            >
                                                {user.role}
                                            </Badge>
                                        </span>
                                        <span className="truncate text-xs">
                                            {user.email}
                                        </span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            }
                        ></DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                            side={
                                isMobile
                                    ? "bottom"
                                    : "right"
                            }
                            align="end"
                            sideOffset={4}
                        >
                            <DropdownMenuGroup>
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage
                                                src={
                                                    user.avatar
                                                }
                                                alt={
                                                    user.name
                                                }
                                            />
                                            <AvatarFallback className="rounded-lg">
                                                CN
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-medium">
                                                {user.name}
                                            </span>
                                            <span className="truncate text-xs">
                                                {user.email}
                                            </span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Sparkles />
                                        Upgrade to Pro
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <BadgeCheck />
                                        Account
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <CreditCard />
                                        Billing
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Bell />
                                        Notifications
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <SignoutDropdownItem />
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

export function SignoutDropdownItem() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const handleSignOut = () => {
        startTransition(async () => {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push("/")
                    },
                },
            })
        })
    }

    return (
        <DropdownMenuItem
            closeOnClick={false}
            onClick={handleSignOut}
            disabled={isPending}
        >
            {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <LogOut className="mr-2 h-4 w-4" />
            )}
            <span>
                {isPending ? "Logging out..." : "Log out"}
            </span>
        </DropdownMenuItem>
    )
}

function SidebarMenuButtonSkeleton() {
    return (
        <SidebarMenuButton size="lg" disabled>
            <Skeleton className="h-8 w-8 rounded-lg shrink-0 bg-background border" />
            <div className="grid flex-1 text-left text-sm leading-tight gap-1">
                <Skeleton className="h-4 w-24 bg-background border" />
                <Skeleton className="h-3 w-32 bg-background border" />
            </div>
            <Skeleton className="ml-auto size-4 rounded shrink-0 bg-background border" />
        </SidebarMenuButton>
    )
}
