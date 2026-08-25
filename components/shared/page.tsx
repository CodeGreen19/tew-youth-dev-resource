"use client"

import { cn } from '@/lib/utils'
import { ComponentProps, ReactNode } from 'react'

// Page Component
export interface PageProps extends ComponentProps<'div'> {
    children: ReactNode
}

export function Page({ children, className, ...props }: PageProps) {
    return (
        <div className={cn('space-y-5', className)} {...props}>
            {children}
        </div>
    )
}

// PageHeader Component
export interface PageHeaderProps extends ComponentProps<'div'> {
    children: ReactNode
}

export function PageHeader({ children, className, ...props }: PageHeaderProps) {
    return (
        <div className={cn('flex items-center justify-between', className)} {...props}>
            {children}
        </div>
    )
}
// PageTitle Component
export interface PageTitleProps extends ComponentProps<'div'> {
    children: ReactNode
}

export function PageTitle({ children, className, ...props }: PageTitleProps) {
    return (
        <div className={cn('text-2xl md:text-3xl font-bold', className)} {...props}>
            {children}
        </div>
    )
}
// PageTitle Component
export interface PageTitleProps extends ComponentProps<'div'> {
    children: ReactNode
}

export function PageAction({ children, className, ...props }: PageTitleProps) {
    return (
        <div className={cn('flex items-center gap-1', className)} {...props}>
            {children}
        </div>
    )
}
