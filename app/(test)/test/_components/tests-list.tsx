"use client"

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getTests } from "../_server/queries"

export default function TestsList({
    tests,
}: {
    tests: Awaited<ReturnType<typeof getTests>>
}) {
    if (!tests?.length) {
        return (
            <Card className="max-w-md mx-auto mt-12 border-dashed text-center p-8">
                <CardContent className="p-0 text-sm text-muted-foreground">
                    <p className="font-medium">
                        No tests found.
                    </p>
                    <p className="text-xs opacity-70">
                        Create a new test to get started.
                    </p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    Available Tests
                </h1>
                <Badge variant="secondary">
                    {tests.length} Total
                </Badge>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                {tests.map((test) => (
                    <Card
                        key={test.id}
                        className="flex flex-col justify-between hover:shadow-sm transition-shadow"
                    >
                        <CardHeader className="p-5 pb-3 space-y-1.5">
                            <div className="flex justify-between items-start gap-2">
                                <CardTitle className="text-lg font-semibold truncate">
                                    {test.name}
                                </CardTitle>
                                <Badge
                                    variant="outline"
                                    className="font-mono text-[10px] uppercase"
                                >
                                    {test.code}
                                </Badge>
                            </div>
                            <CardDescription className="line-clamp-2 text-sm">
                                {test.description ||
                                    "No description provided."}
                            </CardDescription>
                        </CardHeader>

                        <CardFooter className="p-5 pt-3 border-t flex justify-between text-xs text-muted-foreground">
                            <span>
                                Created:{" "}
                                {new Date(
                                    test.createdAt,
                                ).toLocaleDateString()}
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-xs text-primary"
                            >
                                View Details &rarr;
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
