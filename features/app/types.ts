import { getSidebarData } from "./queries"

export type SidebarDataType = Awaited<
    ReturnType<typeof getSidebarData>
>
