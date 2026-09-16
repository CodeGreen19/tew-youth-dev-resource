import { notFound } from "next/navigation"
import { UpdateTestForm } from "../../../_components/update-test-form"
import { getTestById } from "../../../_server/queries"

export default async function EditTestPage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>
    searchParams: Promise<{ returnTo?: string }>
}) {
    const { id } = await params
    const { returnTo } = await searchParams

    const test = await getTestById(id)

    if (!test) {
        notFound()
    }

    return (
        <div className="mx-auto max-w-2xl">
            <UpdateTestForm
                testId={test.id}
                defaultValues={{
                    name: test.name,
                    code: test.code,
                    description: test.description ?? "",
                }}
                returnTo={returnTo || "/test/page-1"}
            />
        </div>
    )
}
