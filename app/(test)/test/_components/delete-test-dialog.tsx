"use client"

import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/toast"
import { useMutation } from "@tanstack/react-query"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { deleteTest } from "../_server/action"
import { getQueryClient } from "@/lib/tanstack-query/get-query-client"

export function DeleteTestDialog({
    testId,
}: {
    testId: string
}) {
    const router = useRouter()
    const qc = getQueryClient()

    const deleteMutation = useMutation({
        mutationFn: () => deleteTest(testId),
        onSuccess: ({ message }) => {
            toast.add({
                title: message,
                type: "success",
            })
            qc.invalidateQueries({
                queryKey: ["advanced-tests"],
            })
        },
        onError: (error) => {
            toast.add({
                title: error.message,
                type: "error",
            })
        },
    })

    return (
        <AlertDialog>
            <AlertDialogTrigger
                render={
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Delete test"
                    >
                        <Trash2 />
                    </Button>
                }
            ></AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Delete this test?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        This action cannot be undone. The
                        test will be permanently deleted.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        variant="destructive"
                        disabled={deleteMutation.isPending}
                        onClick={() =>
                            deleteMutation.mutate()
                        }
                    >
                        {deleteMutation.isPending
                            ? "Deleting..."
                            : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
