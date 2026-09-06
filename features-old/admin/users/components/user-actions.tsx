"use client"

import { useState } from "react"
import {
    SessionWithImpersonatedBy,
    UserWithRole,
} from "better-auth/plugins"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useMutation } from "@tanstack/react-query"
import {
    revokeAllUserSessions,
    revokeUserSession,
    setUserPassword,
} from "../actions"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"

export function UserActions({
    user,
    sessions = [],
}: {
    user: UserWithRole
    sessions: SessionWithImpersonatedBy[]
}) {
    const router = useRouter()
    const [password, setPassword] = useState("")
    const passwordMutation = useMutation({
        mutationFn: setUserPassword,
        onSuccess: ({ message }) => {
            toast.add({ title: message, type: "success" })
            router.refresh()
        },
        onError: ({ message }) =>
            toast.add({ title: message, type: "error" }),
    })
    const revokeMutation = useMutation({
        mutationFn: revokeUserSession,
        onSuccess: ({ message }) => {
            toast.add({ title: message, type: "success" })
            router.refresh()
        },
        onError: ({ message }) =>
            toast.add({ title: message, type: "error" }),
    })
    const revokeAllMutation = useMutation({
        mutationFn: revokeAllUserSessions,
        onSuccess: ({ message }) => {
            toast.add({ title: message, type: "success" })
            router.refresh()
        },
        onError: ({ message }) =>
            toast.add({ title: message, type: "error" }),
    })

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-base font-semibold">
                    Actions
                </h3>
                <p className="text-sm text-muted-foreground">
                    Administrative actions available for
                    this user.
                </p>
            </div>

            {/* Set password */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">
                        Set Password
                    </CardTitle>
                    <CardDescription>
                        Set a new password for this user.
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex gap-2">
                    <div className="flex-1">
                        <Label
                            htmlFor="password"
                            className="sr-only"
                        >
                            Password
                        </Label>

                        <Input
                            id="password"
                            type="text"
                            placeholder="New password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />
                    </div>

                    <Button
                        disabled={
                            !password ||
                            passwordMutation.isPending
                        }
                        onClick={() =>
                            passwordMutation.mutate({
                                userId: user.id,
                                newPassword: password,
                            })
                        }
                    >
                        {passwordMutation.isPending
                            ? "Updating..."
                            : "Set password"}
                    </Button>
                </CardContent>
            </Card>

            {/* Sessions */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <CardTitle className="text-sm">
                                Active Sessions
                            </CardTitle>

                            <CardDescription>
                                Sessions currently
                                associated with this user.
                            </CardDescription>
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                revokeAllMutation.mutate({
                                    userId: user.id,
                                })
                            }
                            disabled={
                                !sessions.length ||
                                revokeAllMutation.isPending
                            }
                        >
                            Revoke all
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    {!sessions.length ? (
                        <p className="text-sm text-muted-foreground">
                            No active sessions.
                        </p>
                    ) : (
                        <div className="divide-y rounded-md border">
                            {sessions.map((session) => (
                                <div
                                    key={session.id}
                                    className="flex items-center justify-between gap-4 p-4"
                                >
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium">
                                            {session.ipAddress ??
                                                "Unknown IP"}
                                        </p>

                                        <p className="truncate text-xs text-muted-foreground">
                                            {session.userAgent ??
                                                "Unknown device"}
                                        </p>

                                        <p className="mt-1 text-xs text-muted-foreground">
                                            Expires{" "}
                                            {session.expiresAt.toLocaleString()}
                                        </p>
                                    </div>

                                    <Button
                                        disabled={
                                            revokeMutation.isPending
                                        }
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            revokeMutation.mutate(
                                                {
                                                    sessionToken:
                                                        session.token,
                                                },
                                            )
                                        }
                                    >
                                        Revoke
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <Separator />
        </div>
    )
}
