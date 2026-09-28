"use client"

import { Logo } from "@/components/shared/logo"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { NavMenu } from "./nav-menu"
import { auth } from "@/lib/auth"

export function Navbar({
    res,
}: {
    res: Awaited<ReturnType<typeof auth.api.getSession>>
}) {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40)
        }

        handleScroll()
        window.addEventListener("scroll", handleScroll, {
            passive: true,
        })

        return () =>
            window.removeEventListener(
                "scroll",
                handleScroll,
            )
    }, [])

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
                scrolled
                    ? "px-5 pt-2 sm:px-8 sm:pt-3"
                    : "px-3 pt-3 sm:px-5 sm:pt-5"
            }`}
        >
            <div
                className={`mx-auto flex items-center justify-between border bg-background/85 px-4 backdrop-blur-xl transition-all duration-500 ease-out sm:px-6 ${
                    scrolled
                        ? "h-14 max-w-5xl rounded-full shadow-md shadow-black/5 sm:h-15"
                        : "h-16 max-w-7xl rounded-xl shadow-lg shadow-black/5 sm:h-18"
                }`}
            >
                <div className="flex items-center justify-center gap-4">
                    <Logo scrolled={scrolled} />
                    <div>
                        <Button variant={"ghost"}>
                            Home
                        </Button>
                        <Button variant={"ghost"}>
                            Course
                        </Button>
                        <Button variant={"ghost"}>
                            Results
                        </Button>
                        <Button variant={"ghost"}>
                            Our Team
                        </Button>
                        <Button variant={"ghost"}>
                            Contact Us
                        </Button>
                    </div>
                </div>

                <div className="hidden">
                    <NavMenu />
                </div>

                {res ? (
                    <Button
                        nativeButton={false}
                        render={
                            <Link href="/dashboard/overviews" />
                        }
                    >
                        Dashboard
                    </Button>
                ) : (
                    <div className="flex items-center gap-1 sm:gap-2">
                        <Button
                            nativeButton={false}
                            render={
                                <Link href="/apply-branch" />
                            }
                            variant="outline"
                            className="hidden sm:flex"
                        >
                            Apply for Branch
                            <ChevronRight />
                        </Button>

                        <Button
                            nativeButton={false}
                            render={
                                <Link href="/apply-branch" />
                            }
                            variant="default"
                            size="sm"
                            className="sm:hidden"
                        >
                            Apply
                        </Button>

                        <Button
                            nativeButton={false}
                            render={<Link href="/login" />}
                            variant="ghost"
                            size="sm"
                        >
                            Login
                        </Button>
                    </div>
                )}
            </div>
        </header>
    )
}
