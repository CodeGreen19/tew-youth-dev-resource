import { getRolesAndPermissions } from "./queries"

export type RolesAndPermissions = Awaited<
    ReturnType<typeof getRolesAndPermissions>
>
