"use client"

import { useAppForm } from "@/components/form/use-app-form"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup } from "@/components/ui/field"
import { toast } from "@/components/ui/toast"
import { courseStatuses } from "@/constants/course"

import { useMutation } from "@tanstack/react-query"
import { addCourse } from "../actions"
import { courseSchema, CourseSchemaType } from "../schemas"
import { SubmitButton } from "@/components/shared/submit-button"
import { capitalize } from "@/utils/helpers"
import { useRouter } from "next/navigation"
import { onSuccessShowToast } from "@/utils/success-toast"
import { onErrorShowToast } from "@/utils/error-toast"

export function AddCourseForm() {
    const router = useRouter()
    const defaultValues: CourseSchemaType = {
        name: "",
        code: "",
        description: "",
        status: "active",
        banner: null as unknown as File,
    }

    const addMutation = useMutation({
        mutationFn: addCourse,
        onSuccess: (res) => {
            onSuccessShowToast(res)
            router.push("/dashboard/courses")
            form.reset()
        },
        onError: onErrorShowToast,
    })

    const form = useAppForm({
        defaultValues,
        validators: {
            onSubmit: courseSchema,
        },
        onSubmit: async ({ value }) => {
            addMutation.mutate(value)
        },
    })

    const isSubmitting = addMutation.isPending
    return (
        <Card>
            <CardHeader>
                <CardTitle>Add Course</CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    id="course-form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit()
                    }}
                >
                    <FieldGroup>
                        <form.AppField
                            name="banner"
                            children={(field) => (
                                <field.FileField label="Banner" />
                            )}
                        />
                        <form.AppField
                            name="name"
                            children={(field) => (
                                <field.TextField label="Course Name" />
                            )}
                        />
                        <form.AppField
                            name="code"
                            children={(field) => (
                                <field.TextField label="Course Code" />
                            )}
                        />
                        <form.AppField
                            name="status"
                            children={(field) => (
                                <field.SelectField
                                    options={courseStatuses.map(
                                        (v) => ({
                                            label: capitalize(
                                                v,
                                            ),
                                            value: v,
                                        }),
                                    )}
                                    label="Course Code"
                                />
                            )}
                        />
                        <form.AppField
                            name="description"
                            children={(field) => (
                                <field.TextareaField label="Course Description (optional)" />
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Field
                    className="justify-end"
                    orientation={"horizontal"}
                >
                    <Button
                        onClick={() => {
                            form.reset()
                        }}
                        variant={"ghost"}
                    >
                        Cancel
                    </Button>
                    <SubmitButton
                        isPending={isSubmitting}
                        form={"course-form"}
                        type="submit"
                    >
                        Submit
                    </SubmitButton>
                </Field>
            </CardFooter>
        </Card>
    )
}
