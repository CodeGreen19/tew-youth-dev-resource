"use client"
import { Error } from '@/components/error'
import React from 'react'

export default function error(props: {
    error: Error & { digest?: string }
    retry: () => void
}) {
    return (
        <Error {...props} />
    )
}
