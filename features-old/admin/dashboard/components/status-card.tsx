"use client"

import {
    Card,
    CardAction,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
export function StatusCard({
    count,
    title,
}: {
    title: string
    count: number
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    Card Description
                </CardDescription>
                <CardAction>{count}</CardAction>
            </CardHeader>
        </Card>
    )
}
