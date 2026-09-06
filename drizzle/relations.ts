import { defineRelations } from "drizzle-orm"
import * as schema from "./schema"

export const relations = defineRelations(schema, (r) => ({
    users: {
        accounts: r.many.accounts(),
        sessions: r.many.sessions(),
        members: r.many.members(),
        invitations: r.many.invitations(),
    },

    sessions: {
        user: r.one.users({
            from: r.sessions.userId,
            to: r.users.id,
        }),
    },

    accounts: {
        user: r.one.users({
            from: r.accounts.userId,
            to: r.users.id,
        }),
    },

    organizations: {
        members: r.many.members(),
        invitations: r.many.invitations(),
    },

    members: {
        organization: r.one.organizations({
            from: r.members.organizationId,
            to: r.organizations.id,
        }),

        user: r.one.users({
            from: r.members.userId,
            to: r.users.id,
        }),
    },

    invitations: {
        organization: r.one.organizations({
            from: r.invitations.organizationId,
            to: r.organizations.id,
        }),

        user: r.one.users({
            from: r.invitations.inviterId,
            to: r.users.id,
        }),
    },

    forms: {
        versions: r.many.formVersions(),
    },

    formVersions: {
        form: r.one.forms({
            from: r.formVersions.formId,
            to: r.forms.id,
        }),

        submissions: r.many.formSubmissions(),
    },

    formSubmissions: {
        version: r.one.formVersions({
            from: r.formSubmissions.formVersionId,
            to: r.formVersions.id,
        }),
    },
}))
