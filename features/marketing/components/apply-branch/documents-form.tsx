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
    documentsSchema,
    DocumentsSchemaType,
} from "../../schemas"

export function DocumentsForm() {
    const defaultValues: DocumentsSchemaType = {
        electricityBillPdf: undefined as unknown as File,
        nidPdf: undefined as unknown as File,
        tradeLicensePdf: undefined as unknown as File,
    }

    const form = useAppForm({
        defaultValues,
        validators: {
            onChange: documentsSchema,
        },
        onSubmit: async ({ value }) => {
            console.log(value)
        },
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Required Documents</CardTitle>
                <CardDescription>
                    Upload the required documents in PDF
                    format. Maximum size is 5MB per file.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    id="documents-form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit()
                    }}
                >
                    <FieldGroup></FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}
