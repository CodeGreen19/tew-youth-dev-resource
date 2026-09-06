import {
    Page,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { getStatus } from "../queries"
import { StatusCard } from "../components/status-card"

export async function DashboardPage() {
    const statuses = await getStatus()
    return (
        <Page>
            <PageHeader>
                <PageTitle>Dashboard</PageTitle>
            </PageHeader>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {statuses.map((status) => (
                    <StatusCard
                        key={status.title}
                        {...status}
                    />
                ))}
            </div>
        </Page>
    )
}
