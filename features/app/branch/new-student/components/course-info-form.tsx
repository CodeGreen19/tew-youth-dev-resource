"use client"

import { useAppForm } from "@/components/form/use-app-form"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { FieldGroup } from "@/components/ui/field"
import {
    CourseInformationSchemaType,
    StudentSchemaType,
    courseInformationSchema,
} from "../schemas"

const COURSE_RANGE_OPTIONS = [
    {
        label: "Beginner",
        value: "beginner",
    },
    {
        label: "Intermediate",
        value: "intermediate",
    },
    {
        label: "Advanced",
        value: "advanced",
    },
]

const COURSE_DURATION_OPTIONS = [
    {
        label: "3 Months",
        value: "3-months",
    },
    {
        label: "6 Months",
        value: "6-months",
    },
    {
        label: "1 Year",
        value: "1-year",
    },
]

const MEDIUM_OPTIONS = [
    {
        label: "Bangla",
        value: "bangla",
    },
    {
        label: "English",
        value: "english",
    },
    {
        label: "Bangla & English",
        value: "bangla-english",
    },
]

export function CourseInformationForm({
    onSuccess,
    formId,
    existedValues,
    courses,
}: {
    onSuccess: (v: CourseInformationSchemaType) => void
    formId: string
    existedValues: StudentSchemaType
    courses: { label: string; value: string }[]
}) {
    const defaultValues: CourseInformationSchemaType = {
        ...existedValues,
    }

    const form = useAppForm({
        defaultValues,
        validators: {
            onChange: courseInformationSchema,
        },
        onSubmit: async ({ value }) => {
            onSuccess(value)
        },
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Course Information</CardTitle>
                <CardDescription>
                    Select the course and provide the course
                    enrollment details.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    id={formId}
                    onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit()
                    }}
                >
                    <FieldGroup>
                        <form.AppField
                            name="courseId"
                            children={(field) => (
                                <field.SelectField
                                    label="Course"
                                    placeholder="Select the course"
                                    options={courses}
                                />
                            )}
                        />

                        <form.AppField
                            name="courseRange"
                            children={(field) => (
                                <field.SelectField
                                    label="Course Range"
                                    placeholder="Select the course range"
                                    options={
                                        COURSE_RANGE_OPTIONS
                                    }
                                />
                            )}
                        />

                        <form.AppField
                            name="courseDuration"
                            children={(field) => (
                                <field.SelectField
                                    label="Course Duration"
                                    placeholder="Select the course duration"
                                    options={
                                        COURSE_DURATION_OPTIONS
                                    }
                                />
                            )}
                        />

                        <form.AppField
                            name="medium"
                            children={(field) => (
                                <field.SelectField
                                    label="Medium"
                                    placeholder="Select the course medium"
                                    options={MEDIUM_OPTIONS}
                                />
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}
