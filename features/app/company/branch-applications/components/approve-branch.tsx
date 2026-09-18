"use client"

import { useMutation } from "@tanstack/react-query"
import { CheckCircle2, XCircle } from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { SubmitButton } from "@/components/shared/submit-button"
import {
    approveApplication,
    createNewBranchWorkspace,
    rejectApplication,
} from "../actions"
import { onSuccessShowToast } from "@/utils/success-toast"
import { onErrorShowToast } from "@/utils/error-toast"
import { BranchApplication } from "../types"
import { useRouter } from "next/navigation"

type BranchStatus = "pending" | "approved" | "rejected"
type Action = "approve" | "reject"

const STATUS_CONFIG = {
    pending: {
        title: "Branch approval",
        description:
            "Review the branch application and choose an action.",
    },
    approved: {
        title: "Branch approved",
        description:
            "This branch application has already been approved.",
    },
    rejected: {
        title: "Branch rejected",
        description:
            "This branch application has already been rejected.",
    },
} satisfies Record<
    BranchStatus,
    { title: string; description: string }
>

export function ApproveBranch({
    status,
    id: applicationId,
    organizationId,
}: Pick<
    BranchApplication,
    "status" | "id" | "organizationId"
>) {
    const [action, setAction] = useState<Action | null>(
        null,
    )
    const router = useRouter()

    const approveMutation = useMutation({
        mutationFn: approveApplication,
        onSuccess: (res) => {
            setAction(null)
            onSuccessShowToast(res)
            router.refresh()
        },
        onError: onErrorShowToast,
    })
    const rejectMutation = useMutation({
        mutationFn: rejectApplication,
        onSuccess: (res) => {
            setAction(null)
            onSuccessShowToast(res)
            router.refresh()
        },
        onError: onErrorShowToast,
    })
    const workspaceMutation = useMutation({
        mutationFn: createNewBranchWorkspace,
        onSuccess: (res) => {
            onSuccessShowToast(res)
            router.refresh()
        },
        onError: onErrorShowToast,
    })

    const actionButtonDisabled =
        status === "approved" || status === "rejected"

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        {STATUS_CONFIG[status].title}
                    </CardTitle>
                    <CardDescription>
                        {STATUS_CONFIG[status].description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col gap-3 sm:flex-row">
                    <Button
                        disabled={actionButtonDisabled}
                        variant={
                            actionButtonDisabled
                                ? "ghost"
                                : "default"
                        }
                        onClick={() => setAction("approve")}
                    >
                        <CheckCircle2 />
                        Accept
                    </Button>

                    <Button
                        disabled={actionButtonDisabled}
                        variant={
                            actionButtonDisabled
                                ? "ghost"
                                : "outline"
                        }
                        onClick={() => setAction("reject")}
                    >
                        <XCircle />
                        Reject
                    </Button>
                    {status === "approved" &&
                        !organizationId && (
                            <SubmitButton
                                isPending={
                                    workspaceMutation.isPending
                                }
                                onClick={() =>
                                    workspaceMutation.mutate(
                                        {
                                            applicationId,
                                        },
                                    )
                                }
                            >
                                Create Workspace
                            </SubmitButton>
                        )}
                </CardContent>
            </Card>

            <Dialog
                open={action !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setAction(null)
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {action === "approve"
                                ? "Accept branch application?"
                                : "Reject branch application?"}
                        </DialogTitle>

                        <DialogDescription>
                            {action === "approve"
                                ? "This will approve the branch application and allow the branch to continue with its dashboard access."
                                : "This will reject the branch application. The application will no longer remain in the pending state."}
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <DialogClose
                            render={
                                <Button
                                    variant="outline"
                                    disabled={
                                        approveMutation.isPending ||
                                        rejectMutation.isPending
                                    }
                                >
                                    Cancel
                                </Button>
                            }
                        ></DialogClose>

                        <SubmitButton
                            isPending={
                                approveMutation.isPending ||
                                rejectMutation.isPending
                            }
                            onClick={() => {
                                if (action === "approve") {
                                    approveMutation.mutate({
                                        applicationId,
                                    })
                                } else {
                                    rejectMutation.mutate({
                                        applicationId,
                                    })
                                }
                            }}
                            type="button"
                        >
                            {action === "approve"
                                ? "Accept branch"
                                : "Reject branch"}
                        </SubmitButton>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
