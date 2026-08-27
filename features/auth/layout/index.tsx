import { Logo } from '@/components/logo'
import React from 'react'

export function AuthLayout(props: LayoutProps<"/">) {
    return (
        <div className='max-w-sm m-auto pt-10 space-y-6 px-4 md:px-0'>
            <Logo />
            <div >{props.children}</div>
        </div>
    )
}
