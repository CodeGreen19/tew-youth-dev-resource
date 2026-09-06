import { ArrowLeft, MoveLeft } from "lucide-react"
import Link from "next/link"

export function AuthLayout(props: LayoutProps<"/">) {
    return (
        <div>
            <h1 className="h-16 flex items-center justify-start px-4 lg:px-8">
                <Link href={"/"}>
                    <MoveLeft />
                </Link>
            </h1>

            <div className="max-w-sm m-auto pt-5">
                {props.children}
            </div>
        </div>
    )
}
