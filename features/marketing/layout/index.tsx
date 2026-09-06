import { Navbar } from "./navbar"

export function MarketingLayot(props: LayoutProps<"/">) {
    return (
        <div>
            <Navbar />
            {props.children}
        </div>
    )
}
