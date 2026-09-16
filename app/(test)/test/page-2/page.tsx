"use client"

import { useQuery } from "@tanstack/react-query"
import { Page2View } from "../_components/page-2-view"
import { getTests } from "../_server/queries"

export default function page() {
    const { data, isPending, error } = useQuery({
        queryKey: ["classic-tests"],
        queryFn: () => getTests(),
    })

    if (isPending) {
        return <div>pending...</div>
    }
    if (error) {
        return <div>Error</div>
    }
    return <Page2View tests={data} />
}
