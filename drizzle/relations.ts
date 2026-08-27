import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
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

    user: {
        accounts: r.many.account(),
        sessions: r.many.session()
    },
    account: {
        user: r.one.user({
            from: r.account.userId,
            to: r.user.id
        })
    }, session: {
        user: r.one.user({
            from: r.session.userId,
            to: r.user.id
        })
    }
}));