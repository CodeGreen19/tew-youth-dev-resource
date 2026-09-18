"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { authClient } from "@/lib/auth-client"
import {
    useMutation,
    useSuspenseQuery,
} from "@tanstack/react-query"
import { GalleryVerticalEnd, Loader2 } from "lucide-react"
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
                                        {data.member.role}
                                    </span>
                                </div>
                            </div>
                        }
                    ></SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
            {/* <SelectOrganizationDialog
                isOpen={!org.isPending && !org.data}
            /> */}
        </SidebarHeader>
    )
}

function AppSidebarHeaderSkeleton() {
    return (
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <div className="flex items-center gap-3 p-2">
                        <Skeleton className="size-8 rounded-lg" />
                        <div className="flex flex-col gap-1.5 flex-1">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                    </div>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
    )
}

function SelectOrganizationDialog({
    isOpen = false,
}: {
    isOpen: boolean
}) {
    const { data: organizations } =
        authClient.useListOrganizations()

    const mutation = useMutation({
        mutationFn: async () => {
            if (!organizations?.[0]?.id) return
            await authClient.organization.setActive({
                organizationId: organizations[0].id,
            })
        },
    })

    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Select an Organization
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Welcome! You do not have an active
                        workspace selected. Click continue
                        to join your primary organization
                        workspace and get started.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault()
                            mutation.mutate()
                        }}
                        disabled={
                            mutation.isPending ||
                            !organizations?.length
                        }
                    >
                        {mutation.isPending && (
                            <Loader2 className="mr-2 size-4 animate-spin" />
                        )}
                        Continue to Workspace
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
