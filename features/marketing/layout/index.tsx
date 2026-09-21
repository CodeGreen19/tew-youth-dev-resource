import { Suspense } from "react"
import { getSession } from "../queries"
import { Navbar } from "./navbar"
import { NavbarSkeleton } from "./navbar-skeleton"

export function MarketingLayot(props: LayoutProps<"/">) {
    return (
        <div>
            <Suspense fallback={<NavbarSkeleton />}>
                <NavbarShell />
            </Suspense>
            {props.children}
        </div>
    )
}

export async function NavbarShell() {
    const res = await getSession()
    return <Navbar res={res} />
}
