"use client"

import { Error } from "@/components/error"

export default function error(props: {
    error: Error & { digest?: string }
    retry: () => void
}) {
    return (
        <Error {...props} />
    )
}
