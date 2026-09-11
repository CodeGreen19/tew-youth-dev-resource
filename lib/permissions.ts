import { createAccessControl } from "better-auth/plugins/access"
import {
    defaultStatements,
    ownerAc,
} from "better-auth/plugins/organization/access"
import {
    branch,
    branch_application,
    course,
    overview,
} from "./resources"

const statement = {
    ...defaultStatements,
    course,
    branch_application,
    overview,
    branch,
} as const

export const ac = createAccessControl(statement)

export const owner = ac.newRole({
    course: statement.course,
    branch: statement.branch,
    branch_application: statement.branch_application,
    overview: statement.overview,
    ...ownerAc.statements,
})
