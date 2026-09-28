import Image from "next/image"
import {
    ArrowUpRight,
    Mail,
    MapPin,
    Phone,
} from "lucide-react"

export function ContactUs() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
            <div className="relative min-h-[560px] overflow-hidden rounded-[2rem] border">
                <Image
                    src="/images/contact-us.jpg"
                    alt="Students learning together"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                />

                <div className="absolute inset-0 bg-background/75 backdrop-blur-[2px]" />

                <div className="relative flex min-h-[560px] items-center justify-center px-6 py-16 sm:px-10 lg:px-16">
                    <div className="w-full max-w-4xl text-center">
                        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border bg-background">
                            <Mail className="size-5" />
                        </div>

                        <p className="mt-5 text-sm font-medium text-muted-foreground">
                            Contact us
                        </p>

                        <h2 className="mx-auto mt-2 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                            Let's build opportunities
                            together.
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                            Whether you are interested in
                            opening a branch, learning about
                            our courses, or simply want to
                            know more about what we do, our
                            team is ready to hear from you.
                        </p>

                        <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
                            <div className="group rounded-2xl border bg-background/90 p-5 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div className="flex size-9 items-center justify-center rounded-xl border bg-muted">
                                        <Phone className="size-4" />
                                    </div>

                                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </div>

                                <p className="mt-5 text-xs font-medium text-muted-foreground">
                                    Call us
                                </p>

                                <p className="mt-1 text-sm font-medium">
                                    +880 1XXX-XXXXXX
                                </p>
                            </div>

                            <div className="group rounded-2xl border bg-background/90 p-5 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div className="flex size-9 items-center justify-center rounded-xl border bg-muted">
                                        <Mail className="size-4" />
                                    </div>

                                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </div>

                                <p className="mt-5 text-xs font-medium text-muted-foreground">
                                    Email us
                                </p>

                                <p className="mt-1 truncate text-sm font-medium">
                                    info@example.com
                                </p>
                            </div>

                            <div className="group rounded-2xl border bg-background/90 p-5 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div className="flex size-9 items-center justify-center rounded-xl border bg-muted">
                                        <MapPin className="size-4" />
                                    </div>

                                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </div>

                                <p className="mt-5 text-xs font-medium text-muted-foreground">
                                    Visit us
                                </p>

                                <p className="mt-1 text-sm font-medium">
                                    Bangladesh
                                </p>
                            </div>
                        </div>

                        <p className="mt-10 text-xs text-muted-foreground">
                            We look forward to connecting
                            with you.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
