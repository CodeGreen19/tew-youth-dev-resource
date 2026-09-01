"use client"
import { useRouter } from 'next/navigation'

import { useAppForm } from '@/components/form/use-app-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup } from '@/components/ui/field'
import { toast } from '@/components/ui/toast'
import { useSelector } from '@tanstack/react-form'
import { addCourse, updateCourse } from '../actions'
import { courseSchema, CourseSchemaType } from '../schemas'

export function CourseForm({ type, existedValue, onCancel, onSuccess }: { type: "UPDATE" | "ADD", existedValue?: CourseSchemaType & { id: string }, onCancel?: () => void, onSuccess?: () => void }) {
    const router = useRouter();
    const defaultValues: CourseSchemaType = existedValue ?? { name: "", code: "", description: "" }
    const form = useAppForm({
        defaultValues, validators: {
            onSubmit: courseSchema,

        },
        onSubmit: async ({ value }) => {
            if (type === "ADD") {
                const res = await addCourse(value);
                toast.add({ title: res.message });
                form.reset();
                onSuccess?.();
            }
            if (type === "UPDATE" && existedValue) {
                const res = await updateCourse({ ...value, id: existedValue.id });
                toast.add({ title: res.message });
                onSuccess?.()
            }

        }
    })

    const isSubmitting = useSelector(form.store, (state) => state.isSubmitting)
    return (
        <Card>
            <CardHeader>
                <CardTitle>{type === "ADD" ? "Add Course" : "Update Course"}</CardTitle>
            </CardHeader>
            <CardContent>
                <form id="course-form" onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}>
                    <FieldGroup>
                        <form.AppField name='name' children={(field) => <field.TextField label='Course Name' />} />
                        <form.AppField name='code' children={(field) => <field.TextField label='Course Code' />} />
                        <form.AppField name='description' children={(field) => <field.TextareaField label='Course Description (optional)' />} />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter >
                <Field className='justify-end' orientation={"horizontal"}>
                    <Button onClick={() => {
                        form.reset();
                        onCancel?.()
                    }} variant={"ghost"}>Cancel</Button>
                    <Button disabled={isSubmitting} form={"course-form"} type='submit'>{type === "ADD" ? "Submit" : " Update"}</Button>
                </Field>
            </CardFooter>
        </Card>
    )
}
