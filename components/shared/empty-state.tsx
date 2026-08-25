"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { Inbox, Plus } from "lucide-react";

interface EmptyStateProps {
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    actionLabel?: string;
    onAction?: () => void;
}

export function EmptyState({
    title = "No data found",
    description = "There is no data to display right now. Get started by creating a new entry.",
    icon = <Inbox />,
    actionLabel = "Add New",
    onAction,
}: EmptyStateProps) {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    {icon}
                </EmptyMedia>
                <EmptyTitle>{title}</EmptyTitle>
                <EmptyDescription>{description}</EmptyDescription>
            </EmptyHeader>

            {onAction && (
                <EmptyContent>
                    <div className="flex flex-wrap gap-3">
                        <Button onClick={onAction}>
                            <Plus className="mr-2 h-4 w-4" />
                            {actionLabel}
                        </Button>
                    </div>
                </EmptyContent>
            )}
        </Empty>
    );
}
