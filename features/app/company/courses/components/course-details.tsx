"use client"

import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { BookOpen, Calendar } from "lucide-react"
import Image from "next/image"
import { Course } from "../types"

export function CourseDetails({
    course,
}: {
    course: Course
}) {
    const imageUrl = course.banner.secureUrl

    return (
        <div className="mx-auto w-full max-w-2xl space-y-6">
            <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                        Course
                    </p>
                    <p className="font-mono text-sm text-muted-foreground">
                        {course.code}
                    </p>
                </div>

                <Badge
                    variant="secondary"
                    className="capitalize"
                >
                    {course.status.replace("-", " ")}
                </Badge>
            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-muted">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={course.name}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <BookOpen className="size-10 text-muted-foreground" />
                    </div>
                )}
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        {course.name}
                    </h1>

                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Calendar className="size-4" />
                        <span>
                            Created{" "}
                            {format(
                                new Date(course.createdAt),
                                "MMM d, yyyy",
                            )}
                        </span>
                    </div>
                </div>

                <div className="border-t pt-4">
                    <p className="text-sm leading-6 text-muted-foreground">
                        {course.description ||
                            "No description provided."}
                    </p>
                </div>
            </div>
        </div>
    )
}
