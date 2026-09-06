"use client"

import { UserWithRole } from "better-auth/plugins"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
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
import { useMutation } from "@tanstack/react-query"
import { banUser, removeUser, unbanUser } from "../actions"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"

export function UserDangerZone({
    user,
}: {
    user: UserWithRole
}) {
    const router = useRouter()
    const banMutation = useMutation({
        mutationFn: banUser,
        onSuccess: ({ message }) => {
            toast.add({ title: message, type: "success" })
            router.refresh()
        },
        onError: ({ message }) =>
            toast.add({ title: message, type: "error" }),
    })
    const unbanMutation = useMutation({
        mutationFn: unbanUser,
        onSuccess: ({ message }) => {
            toast.add({ title: message, type: "success" })
            router.refresh()
        },
        onError: ({ message }) =>
            toast.add({ title: message, type: "error" }),
    })
    const removeMutation = useMutation({
        mutationFn: removeUser,
        onSuccess: ({ message }) => {
            toast.add({ title: message, type: "success" })
            router.push("/admin/users")
        },
        onError: ({ message }) =>
            toast.add({ title: message, type: "error" }),
    })
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-base font-semibold">
                    Danger Zone
                </h3>

                <p className="text-sm text-muted-foreground">
                    Irreversible or security-sensitive
                    actions.
                </p>
            </div>

            {/* Ban */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">
                        {user.banned
                            ? "Unban user"
                            : "Ban user"}
                    </CardTitle>

                    <CardDescription>
                        {user.banned
                            ? "Restore this user's ability to access the application."
                            : "Prevent this user from accessing the application."}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {user.banned ? (
                        <Button
                            disabled={
                                unbanMutation.isPending
                            }
                            variant="outline"
                            onClick={() =>
                                unbanMutation.mutate({
                                    userId: user.id,
                                })
                            }
                        >
                            Unban user
                        </Button>
                    ) : (
                        <Button
                            disabled={banMutation.isPending}
                            variant="destructive"
                            onClick={() =>
                                banMutation.mutate({
                                    userId: user.id,
                                })
                            }
                        >
                            Ban user
                        </Button>
                    )}
                </CardContent>
            </Card>

            <Separator />

            {/* Delete */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">
                        Remove user
                    </CardTitle>

                    <CardDescription>
                        Permanently remove this user from
                        the system. This action cannot be
                        undone.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <AlertDialog>
                        <AlertDialogTrigger
                            render={
                                <Button variant="destructive">
                                    Remove user
                                </Button>
                            }
                        ></AlertDialogTrigger>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Remove {user.name}?
                                </AlertDialogTitle>

                                <AlertDialogDescription>
                                    This permanently removes
                                    the user and their
                                    associated account data.
                                    This action cannot be
                                    undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                                <AlertDialogCancel>
                                    Cancel
                                </AlertDialogCancel>

                                <AlertDialogAction
                                    disabled={
                                        removeMutation.isPending
                                    }
                                    onClick={() =>
                                        removeMutation.mutate(
                                            {
                                                userId: user.id,
                                            },
                                        )
                                    }
                                >
                                    Remove user
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardContent>
            </Card>
        </div>
    )
}
