"use client"

import { Calendar, User } from "lucide-react"
import { format } from "date-fns"
import { Student } from "../types"

export function StudentDetails({
    student,
}: {
    student: Student
}) {
    return (
        <div className="max-w-md mx-auto space-y-6">
            <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                    <User className="size-5 text-muted-foreground" />
                </div>

                <div>
                    <h1 className="font-semibold">
                        {student.name}
                    </h1>

                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="size-3.5" />
                        Created{" "}
                        {format(
                            new Date(student.createdAt),
                            "MMM d, yyyy",
                        )}
                    </p>
                </div>
            </div>
        </div>
    )
}
