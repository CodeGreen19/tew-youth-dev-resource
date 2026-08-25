"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CalendarDays, Pen, Trash2 } from "lucide-react"
import { getCourses } from "../server/queries"

type CourseType = Awaited<ReturnType<typeof getCourses>>[number];
export function CourseCard({
    course,
    onDelete, onEdit
}: {
    course: CourseType;
    onEdit: (v: CourseType) => void;
    onDelete: (v: CourseType) => void;
}) {
    return (
        <Card className="flex h-full flex-col">
            <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                    <Badge variant="secondary">{course.code}</Badge>

                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CalendarDays className="size-3.5" />
                        {new Date(course.updatedAt).toLocaleDateString()}
                    </span>
                </div>

                <CardTitle className="line-clamp-2 text-lg">
                    {course.name}
                </CardTitle>
            </CardHeader>

            {course.description && (
                <CardContent className="flex-1">
                    <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                        {course.description}
                    </p>
                </CardContent>
            )}

            <CardFooter className="gap-2">
                <Button className="flex-1" variant="default">
                    View Course
                </Button>

                <Button onClick={() => onEdit(course)} size="icon" variant="outline" aria-label="Edit course">
                    <Pen />
                </Button>

                <Button onClick={() => onDelete(course)} size="icon" variant="outline" aria-label="Delete course">
                    <Trash2 />
                </Button>
            </CardFooter>
        </Card>
    )
}