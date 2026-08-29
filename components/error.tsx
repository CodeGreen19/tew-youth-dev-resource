

'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import { Button } from './ui/button'
import { AlertCircle } from 'lucide-react'

export function Error({
    error,
    retry,
}: {
    error: Error & { digest?: string }
    retry: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (

        <div className='p-6 flex items-center justify-center flex-col gap-4'>
            <div className='flex items-center justify-center gap-2 text-destructive'>
                <AlertCircle />
                <span>Something went wrong</span>
            </div>
            <Button
                variant={"ghost"}
                onClick={
                    // Attempt to recover by re-fetching and re-rendering the segment
                    () => retry()
                }
            >
                Try again
            </Button>
        </div>


    )
}