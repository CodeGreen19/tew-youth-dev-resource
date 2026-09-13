"use client"
import { getTests } from "../_server/queries"
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

interface TestsListProps {
    tests: Awaited<ReturnType<typeof getTests>>
}

export default function TestsList({
    tests,
}: TestsListProps) {
    if (!tests || tests.length === 0) {
        return (
            <Card className="max-w-md mx-auto mt-12 border-dashed text-center p-8">
                <CardContent className="space-y-2 p-0">
                    <p className="text-sm font-medium text-muted-foreground">
                        No tests found.
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                        Create a new test to get started.
                    </p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-tight">
                    Available Tests
                </h1>
                <Badge
                    variant="secondary"
                    className="rounded-full"
                >
                    {tests.length} Total
                </Badge>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                {tests
                    .slice(tests.length - 2)
                    .map((test) => (
                        <Card
                            key={test.id}
                            className="flex flex-col justify-between hover:shadow-sm transition-shadow"
                        >
                            <CardHeader className="space-y-1.5 p-5 pb-3">
                                <div className="flex justify-between items-start gap-2">
                                    <CardTitle className="text-lg font-semibold truncate">
                                        {test.name}
                                    </CardTitle>
                                    <Badge
                                        variant="outline"
                                        className="font-mono text-[10px] uppercase tracking-wider shrink-0"
                                    >
                                        {test.code}
                                    </Badge>
                                </div>
                                <CardDescription className="line-clamp-2 text-sm">
                                    {test.description ||
                                        "No description provided."}
                                </CardDescription>
                            </CardHeader>

                            <CardFooter className="p-5 pt-3 border-t flex items-center justify-between text-xs text-muted-foreground">
                                <span>
                                    Created:{" "}
                                    {new Date(
                                        test.createdAt,
                                    ).toLocaleDateString()}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 text-xs px-2 text-primary hover:text-primary"
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
