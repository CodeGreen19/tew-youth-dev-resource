"use client"

import { useState } from "react"
import { UserWithRole } from "better-auth/plugins"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useMutation } from "@tanstack/react-query"
import { updateUserName } from "../actions"
import { toast } from "@/components/ui/toast"

export function UserProfile({
    user,
}: {
    user: UserWithRole
}) {
    const [name, setName] = useState(user.name ?? "")

    const updateMutation = useMutation({
        mutationFn: updateUserName,
        onSuccess: ({ message }) => {
            toast.add({ title: message, type: "success" })
        },
        onError: ({ message }) =>
            toast.add({ title: message, type: "error" }),
    })

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-base font-semibold">
                    Profile
                </h3>
                <p className="text-sm text-muted-foreground">
                    Basic information about this user.
                </p>
            </div>

            <div className="grid gap-5">
                <div className="grid gap-2">
                    <Label>Name</Label>

                    <div className="flex gap-2">
                        <Input
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />

                        <Button
                            onClick={() =>
                                updateMutation.mutate({
                                    newName: name,
                                    id: user.id,
                                })
                            }
                            disabled={
                                updateMutation.isPending ||
                                name.trim() ===
                                    user.name?.trim()
                            }
                        >
                            {updateMutation.isPending
                                ? "Saving..."
                                : "Update"}
                        </Button>
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label>Email</Label>
                    <Input value={user.email} disabled />
                </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="text-muted-foreground">
                        Joined
                    </p>
                    <p className="font-medium">
                        {new Date(
                            user.createdAt,
                        ).toLocaleDateString()}
                    </p>
                </div>

                <div>
                    <p className="text-muted-foreground">
                        Role
                    </p>
                    <p className="font-medium capitalize">
                        {user.role ?? "user"}
                    </p>
                </div>

                <div>
                    <p className="text-muted-foreground">
                        User ID
                    </p>
                    <p className="truncate font-mono text-xs">
                        {user.id}
                    </p>
                </div>

                <div>
                    <p className="text-muted-foreground">
                        Status
                    </p>
                    <p className="font-medium">
                        {user.banned ? "Banned" : "Active"}
                    </p>
                </div>
            </div>
        </div>
    )
}
