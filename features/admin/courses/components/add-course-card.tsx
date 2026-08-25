"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"

type AddCourseCardProps = {
  onClick: () => void
}

export function AddCourseCard({ onClick }: AddCourseCardProps) {
  return (
    <Card
      onClick={onClick}
      className="group h-full cursor-pointer border-dashed transition-colors hover:border-primary hover:bg-muted/50"
    >
      <CardContent className="flex h-full flex-col items-center justify-center gap-3 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Plus className="size-5" />
        </div>

        <div>
          <h3 className="font-medium">Add Course</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Create a new course
          </p>
        </div>
      </CardContent>
    </Card>
  )
}