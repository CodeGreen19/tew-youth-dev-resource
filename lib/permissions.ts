import { createAccessControl } from "better-auth/plugins/access"
import {
    defaultStatements,
    adminAc,
} from "better-auth/plugins/admin/access"

const statement = {
    ...defaultStatements,
    dashboard: ["view"] as const,
    branch: ["view"] as const,
    course: [
        "create",
        "view",
        "change-status",
        "update",
        "delete",
    ] as const,
} as const

export const ac = createAccessControl(statement)

export const admin = ac.newRole({
    dashboard: statement.dashboard,
    branch: statement.branch,
    course: statement.course,
    ...adminAc.statements,
})
export const manager = ac.newRole({
    course: statement.course,
})

export const moderator = ac.newRole({
    course: ["view"],
})
