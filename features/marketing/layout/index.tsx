import { Navbar } from "./navbar";

export function MarketingLayout(props: LayoutProps<"/">) {
    return (
        <div>
            <Navbar />

            {props.children}</div>
    )
}
