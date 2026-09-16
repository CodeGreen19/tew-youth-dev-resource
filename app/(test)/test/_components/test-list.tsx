"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Pencil } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { DeleteTestDialog } from "./delete-test-dialog"

export type Test = {
    id: string
    name: string
    code: string
    description: string | null
    createdAt: Date
    updatedAt: Date
}

export function TestList({
    tests,
    updatePage,
}: {
    tests: Test[]
    updatePage: string
}) {
    const router = useRouter()
    const pathname = usePathname()

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tests</CardTitle>
            </CardHeader>

            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Code</TableHead>
                            <TableHead>
                                Description
                            </TableHead>
                            <TableHead className="w-24 text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {tests.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="h-24 text-center"
                                >
                                    No tests found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            tests.map((test) => (
                                <TableRow key={test.id}>
                                    <TableCell className="font-medium">
                                        {test.name}
                                    </TableCell>

                                    <TableCell>
                                        {test.code}
                                    </TableCell>

                                    <TableCell>
                                        {test.description ||
                                            "—"}
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                aria-label="Update test"
                                                onClick={() =>
                                                    router.push(
                                                        `/test/${updatePage}/${test.id}/edit?returnTo=${encodeURIComponent(pathname)}`,
                                                    )
                                                }
                                            >
                                                <Pencil />
                                            </Button>

                                            <DeleteTestDialog
                                                testId={
                                                    test.id
                                                }
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
