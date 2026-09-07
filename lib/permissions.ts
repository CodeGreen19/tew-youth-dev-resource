import { createAccessControl } from "better-auth/plugins/access"
import {
    defaultStatements,
    ownerAc,
    adminAc,
    memberAc,
} from "better-auth/plugins/organization/access"

const statement = {
    ...defaultStatements,
    course: [
        "create",
        "view",
        "change-status",
        "update",
        "delete",
    ] as const,
} as const

export const ac = createAccessControl(statement)

export const member = ac.newRole({
    course: ["view"],
    ...memberAc.statements,
})
export const admin = ac.newRole({
    course: ["view", "create", "update"],
    ...adminAc.statements,
})
export const owner = ac.newRole({
    course: ["view", "create", "update"],
    ...ownerAc.statements,
})
