"use client"

import {
    FallbackError,
    FallbackErrorType,
} from "@/components/fallback-error"

export default function error(props: FallbackErrorType) {
    return <FallbackError {...props} />
}
