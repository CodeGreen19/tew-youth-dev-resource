import {
    Page,
    PageContent,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { getBranchApplicationById } from "../queries"
import ViewDetails from "../components/view-details"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { ApplictionActions } from "../components/appliction-actions"

export async function ApplicationDetials({
    id,
}: {
    id: string
}) {
    const application = await getBranchApplicationById({
        id,
    })
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
                        <ViewDetails
                            application={application}
                        />
                    </TabsContent>
                    <TabsContent value="actions">
                        <ApplictionActions
                            application={application}
                        />
                    </TabsContent>
                </Tabs>
            </PageContent>
        </Page>
    )
}
