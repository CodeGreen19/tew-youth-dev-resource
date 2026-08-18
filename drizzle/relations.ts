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
}));