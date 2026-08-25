"use client"

import { EmptyState } from "@/components/shared/empty-state"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"
import { getCourses } from "../server/queries"
import { AddCourseCard } from "./add-course-card"
import { CourseCard } from "./course-card"
import { CourseForm } from "./course-form"

type Course = Awaited<ReturnType<typeof getCourses>>[number]

export function ShowCourse({ courses }: { courses: Course[] }) {
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [editingCourse, setEditingCourse] = useState<Course | null>(null)
    const [deletingCourse, setDeletingCourse] = useState<Course | null>(null)

    return (
        <div>
            {courses.length === 0 ? (
                <EmptyState
                    onAction={() => setAddDialogOpen(true)}
                    actionLabel="Add New Course"
                />
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {courses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            onEdit={setEditingCourse}
                            onDelete={setDeletingCourse}
                        />
                    ))}

                    <AddCourseCard onClick={() => setAddDialogOpen(true)} />
                </div>
            )}

            <CourseAddDialog
                open={addDialogOpen}
                onOpenChange={setAddDialogOpen}
            />

            {editingCourse && (
                <CourseEditDialog
                    course={editingCourse}
                    open
                    onOpenChange={(open) => {
                        if (!open) setEditingCourse(null)
                    }}
                />
            )}

            {deletingCourse && (
                <CourseDeleteDialog
                    course={deletingCourse}
                    open
                    onOpenChange={(open) => {
                        if (!open) setDeletingCourse(null)
                    }}
                />
            )}
        </div>
    )
}

function CourseAddDialog({
    open,
    onOpenChange,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="p-0">
                <CourseForm
                    type="ADD"
                    onSuccess={() => onOpenChange(false)}
                    onCancel={() => onOpenChange(false)}
                />
            </DialogContent>
        </Dialog>
    )
}

function CourseEditDialog({
    course,
    open,
    onOpenChange,
}: {
    course: Course
    open: boolean
    onOpenChange: (open: boolean) => void
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="p-0">
                <CourseForm
                    type="UPDATE"
                    existedValue={course}
                    onSuccess={() => onOpenChange(false)}
                    onCancel={() => onOpenChange(false)}
                />
            </DialogContent>
        </Dialog>
    )
}

function CourseDeleteDialog({
    course,
    open,
    onOpenChange,
}: {
    course: Course
    open: boolean
    onOpenChange: (open: boolean) => void
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete course?</DialogTitle>
                </DialogHeader>

                <p className="text-sm text-muted-foreground">
                    Are you sure you want to delete{" "}
                    <span className="font-medium text-foreground">
                        {course.name}
                    </span>
                    ? This action cannot be undone.
                </p>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>

                    <Button variant="destructive">
                        Delete Course
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}