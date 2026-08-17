"use client"

import { useAppForm } from '@/components/form/use-app-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FormDefinition } from '@/types/form'
import { createDefaultValues } from '../helpers/create-default-values'
import { createFormSchema } from '../helpers/create-form-schema'
import { toast } from '@/components/ui/toast'


export function DynamicForm({ definations }: { definations: FormDefinition }) {

    const schema = createFormSchema(definations);
    const defaultValues = createDefaultValues(definations);



    const form = useAppForm({
        defaultValues,
        validators: {
            onSubmit: schema,
        },

        onSubmit: async ({ value }) => {
            toast.add({
                title: "Entered Values", description: <span className="text-xs font-mono">
                    {JSON.stringify(value, null, 2)}
                </span>
            })

        }
    })



    return (
        <div className='space-y-5'>
            <Card className=' shadow-none ring-0 p-1 rounded-none'>
                <CardHeader className='px-0'>
                    <CardTitle>{definations.name}</CardTitle>
                    <CardDescription>{definations.description}</CardDescription>
                </CardHeader>
                <CardContent className='px-0'>
                    <form
                        id="dynamic-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.handleSubmit();

                        }}
                        className='space-y-3'
                    >
                        {definations.fields.map((f) => (
                            f.type === "text" ? <form.AppField key={f.id} name={f.name} children={(field) => <field.TextField placeholder={f.placeholder} label={f.name} description={f.description} />} />
                                : f.type === "number" ? <form.AppField key={f.id} name={f.name} children={(field) => <field.NumberField placeholder={f.placeholder} label={f.name} description={f.description} />} />
                                    : f.type === "email" ? <form.AppField key={f.id} name={f.name} children={(field) => <field.EmailField placeholder={f.placeholder} label={f.name} description={f.description} />} />
                                        : f.type === "textarea" ? <form.AppField key={f.id} name={f.name} children={(field) => <field.TextareaField placeholder={f.placeholder} label={f.name} description={f.description} />} /> : null
                        ))}


                    </form>
                </CardContent>
                <CardFooter className='px-0 flex items-center justify-end'>
                    <Button variant={"secondary"} type='submit' form='dynamic-form'>{definations.settings.submitLabel}</Button>
                </CardFooter>
            </Card>
        </div>
    )
}



