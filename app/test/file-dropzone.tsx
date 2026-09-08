"use client"

import React, { useCallback } from "react"
import { useDropzone, Accept } from "react-dropzone"
import { UseMutationResult } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import {
    Loader2,
    UploadCloud,
    File,
    CheckCircle2,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadResponse {
    url?: string
    secureUrl?: string
    [key: string]: unknown
}

interface FileDropzoneProps {
    label: string
    accept?: Accept
    mutation: UseMutationResult<UploadResponse, Error, File>
    icon?: React.ReactNode
}

export function FileDropzone({
    label,
    accept,
    mutation,
    icon,
}: FileDropzoneProps): React.JSX.Element {
    const [selectedFile, setSelectedFile] =
        React.useState<File | null>(null)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setSelectedFile(acceptedFiles[0])
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } =
        useDropzone({
            onDrop,
            accept,
            multiple: false,
            disabled: mutation.isPending,
        })

    const handleUpload = () => {
        if (!selectedFile) return
        mutation.mutate(selectedFile, {
            onSuccess: () => setSelectedFile(null),
        })
    }

    return (
        <div className="space-y-3">
            <p className="text-sm font-medium">{label}</p>
            <div
                {...getRootProps()}
                className={cn(
                    "flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
                    isDragActive
                        ? "border-primary bg-primary/10"
                        : "border-slate-200 hover:bg-slate-50",
                    mutation.isPending &&
                        "pointer-events-none opacity-60",
                )}
            >
                <input {...getInputProps()} />
                {selectedFile ? (
                    <div className="flex items-center space-x-2 text-sm text-slate-700">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span className="font-medium truncate max-w-50">
                            {selectedFile.name}
                        </span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-center">
                        {icon || (
                            <UploadCloud className="w-8 h-8 mb-2 text-slate-400" />
                        )}
                        <p className="text-xs text-slate-500">
                            {isDragActive
                                ? "Drop file here..."
                                : "Drag & drop file here, or click to browse"}
                        </p>
                    </div>
                )}
            </div>

            <Button
                onClick={handleUpload}
                disabled={
                    !selectedFile || mutation.isPending
                }
                className="w-full"
            >
                {mutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    `Upload ${selectedFile ? selectedFile.name.split(".").pop()?.toUpperCase() : ""}`
                )}
            </Button>
        </div>
    )
}
