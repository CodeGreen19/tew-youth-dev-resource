
import { defineRelations } from "drizzle-orm"
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
    forms: {
        submissions: r.many.formSubmissions()
    },
    formSubmissions: {
        form: r.one.forms({ from: r.forms.id, to: r.formSubmissions.formId })
    }

}))

