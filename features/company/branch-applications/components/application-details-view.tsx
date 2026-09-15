import {
    Page,
    PageContent,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import { ApplictionActions } from "../components/application-actions"
import { ApplicationDetails } from "./application-details"

export function ApplicationDetialsView({
    id,
}: {
    id: string
}) {
    return (
        <Page>
            <PageHeader>
                <PageTitle backTo="/company/branch-applications">
                    Application Details
                </PageTitle>
            </PageHeader>
            <PageContent>
                <Tabs defaultValue="details">
                    <TabsList>
                        <TabsTrigger value="details">
                            Details
                        </TabsTrigger>
                        <TabsTrigger value="actions">
                            Actions
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="details">
                        {" "}
                        <ApplicationDetails id={id} />
                    </TabsContent>
                    <TabsContent value="actions">
                        <ApplictionActions id={id} />
                    </TabsContent>
                </Tabs>
            </PageContent>
        </Page>
    )
}
