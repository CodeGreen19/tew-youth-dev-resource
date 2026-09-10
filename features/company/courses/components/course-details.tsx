"use client"

import Image from "next/image"
import { format } from "date-fns"
import {
    ArrowLeft,
    Calendar,
    BookOpen,
    Code,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Course } from "../types"

const statusStyles = {
    active: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
    "up-coming":
        "bg-amber-500/10 text-amber-600 border-amber-200",
    "in-active":
        "bg-zinc-500/10 text-zinc-600 border-zinc-200",
}

export default function CourseDetails({
    course,
}: {
    course: Course
}) {
    const imageUrl = course.banner.secureUrl
    return (
        <div className="max-w-md mx-auto bg-background pb-20 text-foreground space-y-4">
            <div className="sticky top-0 z-10 flex items-center justify-between  bg-background/80  backdrop-blur-sm">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Code : {course.code}
                </span>
                <Badge
                    variant="outline"
                    className={`capitalize ${statusStyles[course.status]}`}
                >
                    {course.status.replace("-", " ")}
                </Badge>
            </div>

            {/* Banner */}
            <div className="relative h-48 w-full bg-muted">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={course.name}
                        fill
                        className="object-cover rounded-sm"
                        priority
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                        <BookOpen className="h-10 w-10" />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="space-y-4">
                <div>
                    <h1 className="text-xl font-bold">
                        {course.name}
                    </h1>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Calendar className="h-3.5 w-3.5" />
                        Created{" "}
                        {format(
                            new Date(course.createdAt),
                            "MMM d, yyyy",
                        )}
                    </p>
                </div>

                <p className=" text-sm leading-relaxed text-muted-foreground">
                    {course.description ||
                        "No description provided."}
                </p>
            </div>
        </div>
    )
}
