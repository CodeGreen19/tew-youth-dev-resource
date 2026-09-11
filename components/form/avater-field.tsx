"use client"

import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { FormField } from "@/types/form"
import { ImagePlus } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import Cropper, { type Area } from "react-easy-crop"
import { useFieldContext } from "./use-app-form"
import { Button } from "../ui/button"
import NextImage from "next/image"

type AvatarFieldProps = Pick<
    FormField,
    "label" | "description"
> & {
    maxSize?: number
}

export function AvatarField({
    label,
    description,
    maxSize = 5 * 1024 * 1024,
}: AvatarFieldProps) {
    const field = useFieldContext<File | null>()

    const [image, setImage] = useState<string>()
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [error, setError] = useState<string>()
    const [cropArea, setCropArea] = useState<Area>()
    const [croppedFile, setCroppedFile] =
        useState<File | null>(null)

    const isInvalid =
        field.state.meta.isTouched &&
        !field.state.meta.isValid

    const handleChange = (file?: File) => {
        if (!file) return

        if (!file.type.startsWith("image/")) {
            setError("Please select an image.")
            return
        }

        if (file.size > maxSize) {
            setError(
                `Image must be smaller than ${formatSize(maxSize)}.`,
            )
            return
        }

        setError(undefined)
        setImage(URL.createObjectURL(file))
        setCrop({ x: 0, y: 0 })
        setZoom(1)
        field.handleChange(file)
    }

    console.log("crop", cropArea)

    useEffect(() => {
        const file = field.state.value

        if (!file) {
            setImage(undefined)
            return
        }

        const url = URL.createObjectURL(file)
        setImage(url)

        return () => URL.revokeObjectURL(url)
    }, [field.state.value])

    return (
        <Field data-invalid={isInvalid}>
            {label && (
                <FieldLabel htmlFor={field.name}>
                    {label}
                </FieldLabel>
            )}
            {/* testing */}
            <div>
                <Button
                    onClick={async () => {
                        const file = field.state.value
                        if (!file || !cropArea) return
                        const res = await getCroppedFile(
                            file,
                            cropArea,
                        )
                        setCroppedFile(res)
                    }}
                >
                    Apply changes
                </Button>

                {croppedFile && (
                    <NextImage
                        src={URL.createObjectURL(
                            croppedFile,
                        )}
                        height={100}
                        width={100}
                        alt="cropped image"
                    />
                )}
            </div>

            {image ? (
                <div className="space-y-4">
                    <div className="flex items-end gap-2 justify-start">
                        <div className="relative aspect-square w-40! overflow-hidden border rounded-sm border-background shadow-lg ring-1 ring-border">
                            <Cropper
                                image={image}
                                crop={crop}
                                zoom={zoom}
                                aspect={1 / 1}
                                cropShape="round"

                                showGrid={false}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={setCropArea}
                            />
                        </div>
                        <Button
                            onClick={() => {
                                field.setValue(null)
                                setImage("")
                            }}
                            className={"text-destructive"}
                            variant={"ghost"}
                        >
                            Remove
                        </Button>
                    </div>

                    <div className="mx-auto w-full space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Zoom</span>
                            <span>{zoom.toFixed(1)}x</span>
                        </div>

                        <Slider
                            value={[zoom]}
                            min={1}
                            max={3}
                            step={0.1}
                            onValueChange={(value) =>
                                setZoom(value as number)
                            }
                        />
                    </div>
                </div>
            ) : (
                <label
                    htmlFor={field.name}
                    className="group flex aspect-square w-40! cursor-pointer flex-col items-center justify-center border rounded-sm border-dashed bg-muted/30 transition hover:border-primary hover:bg-muted/50 "
                >
                    <div className="flex size-12 items-center justify-center rounded-full bg-background shadow-sm transition group-hover:scale-105">
                        <ImagePlus className="size-5 text-muted-foreground group-hover:text-primary" />
                    </div>

                    <span className="mt-3 text-sm font-medium">
                        Upload avatar
                    </span>

                    <span className="mt-1 text-xs text-muted-foreground">
                        JPG, PNG or WebP
                    </span>

                    <Input
                        id={field.name}
                        name={field.name}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(e) =>
                            handleChange(
                                e.target.files?.[0],
                            )
                        }
                        onBlur={field.handleBlur}
                    />
                </label>
            )}

            {description && !error && (
                <FieldDescription>
                    {description}
                </FieldDescription>
            )}

            {error && (
                <FieldError errors={[{ message: error }]} />
            )}

            {isInvalid && !error && (
                <FieldError
                    errors={field.state.meta.errors}
                />
            )}
        </Field>
    )
}

async function getCroppedFile(
    file: File,
    crop: Area,
): Promise<File> {
    const image = await loadImage(URL.createObjectURL(file))

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) {
        throw new Error("Could not create canvas context.")
    }

    canvas.width = crop.width
    canvas.height = crop.height

    ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height,
    )

    const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, file.type, 0.9),
    )

    if (!blob) {
        throw new Error("Could not create cropped image.")
    }

    return new File([blob], file.name, {
        type: file.type,
        lastModified: Date.now(),
    })
}

function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image()

        image.onload = () => resolve(image)
        image.onerror = reject
        image.src = src
    })
}

function formatSize(bytes: number) {
    return `${(bytes / 1024 / 1024).toFixed(0)} MB`
}
