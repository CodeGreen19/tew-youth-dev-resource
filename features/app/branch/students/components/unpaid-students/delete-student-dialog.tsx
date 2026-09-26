"use client"

import React, { Dispatch, SetStateAction } from "react"
import { Loader2, Trash2 } from "lucide-react"
import { useMutation } from "@tanstack/react-query"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { UnpaidStudent } from "../../types"
import { deleteStudent } from "../../actions"
import { SubmitButton } from "@/components/shared/submit-button"

export function DeleteStudentDialog({
    deleteDialogInfo,
    setDeleteDialogInfo,
}: {
    deleteDialogInfo: UnpaidStudent | null
    setDeleteDialogInfo: Dispatch<
        SetStateAction<UnpaidStudent | null>
    >
}) {
    const mutation = useMutation({
        mutationFn: deleteStudent,
        onSuccess: () => {
            setDeleteDialogInfo(null)
        },
    })

    const open = !!deleteDialogInfo

    function handleDelete() {
        if (!deleteDialogInfo?.id) return

        mutation.mutate({ studentId: deleteDialogInfo.id })
    }

    return (
        <AlertDialog
            open={open}
            onOpenChange={(open) => {
                if (!open && !mutation.isPending) {
                    setDeleteDialogInfo(null)
                }
            }}
        >
            <AlertDialogContent className="sm:max-w-md">
                <AlertDialogHeader>
                    <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                        <Trash2 className="size-5" />
                    </div>

                    <AlertDialogTitle>
                        Delete student?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        This will permanently delete{" "}
                        <span className="font-medium text-foreground">
                            {
                                deleteDialogInfo?.student
                                    ?.name
                            }
                        </span>{" "}
                        and the associated student
                        information. This action cannot be
                        undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel
                        disabled={mutation.isPending}
                    >
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        nativeButton={false}
                        render={
                            <SubmitButton
                                variant="destructive"
                                isPending={
                                    mutation.isPending
                                }
                                onClick={(event) => {
                                    handleDelete()
                                }}
                            >
                                Delete student
                            </SubmitButton>
                        }
                    ></AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
