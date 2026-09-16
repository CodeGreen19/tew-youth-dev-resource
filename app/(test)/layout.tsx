import { Suspense } from "react"
import { NavHeader } from "./test/_components/nav-header"

export default function layout(props: LayoutProps<"/">) {
    return (
        <div>
            <Suspense>
                <NavHeader />
            </Suspense>
            <div className="p-4 max-w-lg">
                {props.children}
            </div>
        </div>
    )
}
