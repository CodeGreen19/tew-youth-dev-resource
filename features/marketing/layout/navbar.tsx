"use client"

import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"

export function Navbar() {
    const { data: session, isPending } =
        authClient.useSession()

    return (
        <div className="h-20 border-b bg-background">
            <div className="flex items-center h-full justify-between px-4 max-w-7xl xl:px-0 m-auto">
                <Logo />
                <div>
                    {isPending ? (
                        <Skeleton className="h-10 w-24" />
                    ) : session ? (
                        <Button
                            nativeButton={false}
                            render={
                                <Link href="/company/overviews" />
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
                                Apply for Branch
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
