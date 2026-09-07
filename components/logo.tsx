import Image from "next/image"
import Link from "next/link"

export function Logo() {
    return (
        <div className="flex items-center justify-center">
            <Link href={"/"}>
                <Image
                    src={"/logo.png"}
                    height={70}
                    width={60}
                    alt="main-log"
                />
            </Link>
        </div>
    )
}
