"use client"

import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// 1. Define the navigation items as a constant array
const NAV_ITEMS = [
    { label: "Page 1", href: "/test/page-1" },
    { label: "Page 2", href: "/test/page-2" },
    { label: "Page 3", href: "/test/page-3" },
    { label: "Page 4", href: "/test/page-4" },
]

export function NavHeader() {
    const pathname = usePathname()

    return (
        <nav className="p-4 border-b flex gap-2">
            {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href

                return (
                    <Button
                        key={item.href}
                        nativeButton={false}
                        variant={
                            isActive ? "default" : "ghost"
                        }
                        render={<Link href={item.href} />}
                    >
                        {item.label}
                    </Button>
                )
            })}
        </nav>
    )
}
