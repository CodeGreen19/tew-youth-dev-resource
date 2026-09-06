"use client"

import {
    SessionWithImpersonatedBy,
    UserWithRole,
} from "better-auth/plugins"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import { UserProfile } from "./user-profile"
import { UserActions } from "./user-actions"
import { UserDangerZone } from "./user-danger-zone"

export default function ShowSingleUser({
    user,
    sessions,
}: {
    user: UserWithRole
    sessions: SessionWithImpersonatedBy[]
}) {
    return (
        <Tabs defaultValue="profile" className="w-full">
            <TabsList>
                <TabsTrigger value="profile">
                    Profile
                </TabsTrigger>

                <TabsTrigger value="actions">
                    Actions
                </TabsTrigger>

                <TabsTrigger value="danger">
                    Danger Zone
                </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
                <UserProfile user={user} />
            </TabsContent>

            <TabsContent value="actions" className="mt-6">
                <UserActions
                    user={user}
                    sessions={sessions}
                />
            </TabsContent>

            <TabsContent value="danger" className="mt-6">
                <UserDangerZone user={user} />
            </TabsContent>
        </Tabs>
    )
}
