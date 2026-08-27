import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import React from 'react'

export function HomePage() {
    return (
        <div className='min-h-[70vh] bg-primary text-background px-4 xl:px-0 py-6'>
            <div className='max-w-7xl m-auto grid lg:grid-cols-2 gap-5'>
                <div className='text-3xl font-bold space-y-3'>
                    <p>Wants to learn valuable skills</p>
                    <Button variant={"secondary"}>Browse Courses <ChevronRight /></Button>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}
