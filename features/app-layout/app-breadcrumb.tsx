"use client"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import { navData } from "../constants"

export function AppBreadcrumb() {
    const pathname = usePathname()
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                        {
                            navData.navMain.find((nav) =>
                                nav.items.some((item) =>
                                    pathname.startsWith(
                                        item.url,
                                    ),
                                ),
                            )?.title
                        }
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                    <BreadcrumbPage>
                        {navData.navMain
                            .flatMap(
                                (nav) => nav.items || [],
                            )
                            .find((item) =>
                                pathname.startsWith(
                                    item.url,
                                ),
                            )?.title || ""}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
