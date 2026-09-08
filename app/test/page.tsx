"use client"

import React from "react"
import { useMutation } from "@tanstack/react-query"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { FileText, ImageIcon } from "lucide-react"
import { upload, uploadPdf } from "./action"
import { FileDropzone } from "./file-dropzone"

export default function FileUploadFields(): React.JSX.Element {
    const imageMutation = useMutation({
        mutationFn: upload,
        onSuccess: (data) =>
            alert(
                `Image uploaded successfully! URL: ${data.secureUrl}`,
            ),
        onError: (error) =>
            alert(`Image upload failed: ${error.message}`),
    })

    const pdfMutation = useMutation({
        mutationFn: uploadPdf,
        onSuccess: (data) =>
            alert(
                `PDF uploaded successfully! URL: ${data.url}`,
            ),
        onError: (error) =>
            alert(`PDF upload failed: ${error.message}`),
    })

    return (
        <div className="flex justify-center items-center p-6 min-h-screen bg-slate-50">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle>Media Upload</CardTitle>
                    <CardDescription>
                        Upload your documents and images
                        securely.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <FileDropzone
                        label="Image Upload"
                        accept={{ "image/*": [] }}
                        mutation={imageMutation}
                        icon={
                            <ImageIcon className="w-8 h-8 mb-2 text-slate-400" />
                        }
                    />

                    <FileDropzone
                        label="PDF Upload"
                        accept={{
                            "application/pdf": [".pdf"],
                        }}
                        mutation={pdfMutation}
                        icon={
                            <FileText className="w-8 h-8 mb-2 text-slate-400" />
                        }
                    />
                </CardContent>
            </Card>
        </div>
    )
}
