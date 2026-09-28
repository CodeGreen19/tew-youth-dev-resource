"use client"

import Link from "next/link"
import { Mail } from "lucide-react"

const socialLinks = [
    { label: "Facebook", href: "#", icon: Mail },
    { label: "Instagram", href: "#", icon: Mail },
    { label: "LinkedIn", href: "#", icon: Mail },
    { label: "GitHub", href: "#", icon: Mail },
]

export function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
                    <div className="space-y-2">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight"
                        >
                            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <Mail className="size-4" />
                            </span>
                            Your Company
                        </Link>

                        <p className="max-w-sm text-sm leading-5 text-muted-foreground">
                            Empowering communities through
                            accessible skills, training, and
                            opportunity.
                        </p>
                    </div>

                    <div className="flex items-center gap-1">
                        {socialLinks.map(
                            ({
                                label,
                                href,
                                icon: Icon,
                            }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                >
                                    <Icon className="size-4" />
                                </Link>
                            ),
                        )}
                    </div>
                </div>

                <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t pt-5 text-xs text-muted-foreground sm:flex-row">
                    <p>
                        © {new Date().getFullYear()} Your
                        Company. All rights reserved.
                    </p>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/privacy"
                            className="transition-colors hover:text-foreground"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="/terms"
                            className="transition-colors hover:text-foreground"
                        >
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
