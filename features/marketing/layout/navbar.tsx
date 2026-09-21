"use client"

import { Logo } from "@/components/shared/logo"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { getSession } from "../queries"
import { NavMenu } from "./nav-menu"

export function Navbar({
    res,
}: {
    res: Awaited<ReturnType<typeof getSession>>
}) {
    return (
        <div className="h-24 border-b ">
            <div className="flex items-center h-full justify-between px-4 max-w-7xl xl:px-0 m-auto">
                <Logo />
                <div className="hidden">
                    <NavMenu />
                </div>
                <div>
                    {res ? (
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
                                Apply for Branch
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
