import { createAccessControl } from "better-auth/plugins/access"
import {
    defaultStatements,
    adminAc,
} from "better-auth/plugins/admin/access"

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

export const user = ac.newRole({
    course: ["view"],
})

export const admin = ac.newRole({
    course: ["create", "delete", "view"],

    ...adminAc.statements,
})

export const superAdmin = ac.newRole({
    course: ["view", "change-status"],
})

export const testingPermissions = {
    course: [
        "create",
        "view",
        "change-status",
        "update",
        "delete",
    ] as const,
    branches: [
        "create",
        "view",
        "change-status",
        "update",
        "delete",
    ] as const,
    users: [
        "create",
        "view",
        "change-status",
        "update",
        "delete",
    ] as const,
}
