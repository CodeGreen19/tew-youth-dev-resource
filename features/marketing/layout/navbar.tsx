import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import React from 'react'

export function Navbar() {
    return (
        <div className='border-b'>
            <div className='max-w-7xl m-auto flex items-center justify-between h-16 px-4 xl:px-0'>
                <Logo />
                <Button variant={"ghost"}>Sign in</Button>
            </div>
        </div>
    )
}
