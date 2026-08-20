import { Skeleton } from '@/components/ui/skeleton'
import React, { Suspense, ViewTransition } from 'react'

export default function page() {
    return (
        <div>
            <ViewTransition>
                <Suspense fallback={<div className='space-y-1'>
                    <Skeleton className='h-5 w-full' />
                    <Skeleton className='h-5 w-4/5' />
                    <Skeleton className='h-5 w-full' />
                    <Skeleton className='h-5 w-1/2' />
                </div>}>
                    <GetData />
                </Suspense>
            </ViewTransition>
        </div>
    )
}

async function GetData() {
    await new Promise((res) => setTimeout(res, 1000))
    return <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ea, fugiat ducimus, dolore assumenda dolores perspiciatis dolorum doloremque debitis eveniet officiis, possimus neque et dicta quibusdam maiores quisquam architecto harum!</div>
}