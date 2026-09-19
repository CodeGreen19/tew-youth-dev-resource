"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Field } from "@/components/ui/field"
import { toast } from "@/components/ui/toast"
import { useMutation } from "@tanstack/react-query"
import { Dispatch, SetStateAction } from "react"
import { deleteStudent } from "../actions"
import { Student } from "../types"

export function DeleteStudentDialog({
    deleteDialogInfo,
    setDeleteDialogInfo,
}: {
    deleteDialogInfo: Student | null
    setDeleteDialogInfo: Dispatch<
        SetStateAction<Student | null>
    >
}) {
    const mutation = useMutation({
        mutationFn: deleteStudent,

        onSuccess: ({ message }) => {
            toast.add({
                title: message,
                type: "success",
            })
        },

        onError: ({ message }) => {
            toast.add({
                title: message,
                type: "error",
            })
        },

        onSettled: () => {
            setDeleteDialogInfo(null)
        },
    })

    return (
        <Dialog
            open={!!deleteDialogInfo}
            onOpenChange={(open) => {
                if (!open) {
                    setDeleteDialogInfo(null)
                }
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Are you absolutely sure?
                    </DialogTitle>

                    <DialogDescription>
                        This action cannot be undone. This
                        will permanently delete the student{" "}
                        <span className="font-semibold">
                            "{deleteDialogInfo?.name}"
                        </span>{" "}
                        from your records.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Field
                        className="justify-end"
                        orientation="horizontal"
                    >
                        <Button
                            onClick={() =>
                                setDeleteDialogInfo(null)
                            }
                            variant="ghost"
                        >
                            Cancel
                        </Button>

                        <Button
                            disabled={mutation.isPending}
                            onClick={() => {
                                if (deleteDialogInfo) {
                                    mutation.mutate({
                                        id: deleteDialogInfo.id,
                                    })
                                }
                            }}
                            variant="destructive"
                        >
                            Delete Forever
                        </Button>
                    </Field>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
