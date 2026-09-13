import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function layout(props: LayoutProps<"/">) {
    return (
        <div>
            <nav>
                <Button
                    nativeButton={false}
                    render={<Link href={"/test"} />}
                >
                    Test
                </Button>
                <Button
                    nativeButton={false}
                    render={<Link href={"/test2"} />}
                >
                    Test2
                </Button>
            </nav>
            <div>{props.children}</div>
        </div>
    )
}
