"use client"

import { Logo } from "@/components/shared/logo"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { authClient } from "@/lib/auth-client"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { NavMenu } from "./nav-menu"

export function Navbar() {
    const { data: session, isPending } =
        authClient.useSession()

    return (
        <div className="h-24 border-b ">
            <div className="flex items-center h-full justify-between px-4 max-w-7xl xl:px-0 m-auto">
                <Logo />
                <div className="hidden">
                    <NavMenu />
                </div>
                <div>
                    {isPending ? (
                        <Skeleton className="h-10 w-24 bg-background" />
                    ) : session ? (
                        <Button
                            nativeButton={false}
                            render={
                                <Link href="/dashboard/overviews" />
                            }
                            variant="default"
                        >
                            Dashboard
                        </Button>
                    ) : (
                        <div>
                            <Button
                                nativeButton={false}
                                render={
                                    <Link href="/apply-branch" />
                                }
                                variant="outline"
                            >
                                Apply for Branch{" "}
                                <ChevronRight />
                            </Button>
                            <Button
                                nativeButton={false}
                                render={
                                    <Link href="/login" />
                                }
                                variant="ghost"
                            >
                                Login
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
