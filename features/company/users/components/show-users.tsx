"use client"

import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { addMember } from "../actions"

export default function ShowUsers() {
    const mutation = useMutation({ mutationFn: addMember })
    return (
        <div>
            <Button
                disabled={mutation.isPending}
                onClick={() => {
                    mutation.mutate()
                }}
            >
                Create user
            </Button>
        </div>
    )
}
