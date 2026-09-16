"use client"

import { useRouter } from "next/navigation"
import { AddTestForm } from "../../_components/add-test-form"

export default function NewTestPage() {
    const router = useRouter()

    return (
        <div className="mx-auto max-w-2xl">
            <AddTestForm
                onSuccess={() =>
                    router.push("/test/page-4")
                }
            />
        </div>
    )
}
