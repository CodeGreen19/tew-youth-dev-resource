import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export function Logo({ scrolled }: { scrolled?: boolean }) {
    return (
        <div className="flex items-center justify-center">
            <Link href={"/"}>
                <Image
                    src={"/logo.png"}
                    height={60}
                    width={50}
                    alt="main-log"
                    loading="eager"
                    className={cn(
                        "w-15 transition-all",
                        scrolled ? "w-10" : "",
                    )}
                />
            </Link>
        </div>
    )
}
