"use client"

import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { toast } from "@/components/ui/toast"
import { action } from "../_server/action"
import { useRouter } from "next/navigation"

export function AddTest() {
    const router = useRouter()
    const mutation = useMutation({
        mutationFn: action,
        onSuccess: ({ message }) => {
            toast.add({ title: message, type: "success" })
            router.refresh()
        },
        onError: ({ message }) =>
            toast.add({
                title: message,
                type: "error",
            }),
    })

    return (
        <div>
            <Button
                onClick={() => mutation.mutate()}
                disabled={mutation.isPending}
            >
                Start Action
            </Button>
        </div>
    )
}
