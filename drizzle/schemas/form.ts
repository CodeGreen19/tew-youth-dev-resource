import { FormDefinition } from "@/types/form";
import {
    boolean,
    index,
    jsonb,
    snakeCase,
    text,
    uuid,
    varchar
} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../helpers";

export const forms = snakeCase.table(
    "forms",
    {
        id,

        name: varchar({ length: 255 }).notNull(),

        slug: varchar({ length: 255 }).notNull().unique(),

        description: text(),

        schema: jsonb()
            .$type<FormDefinition>()
            .notNull(),

        isPublished: boolean()
            .default(false)
            .notNull(),

        createdAt,
        updatedAt
    },
    (table) => [
        index("forms_slug_idx").on(table.slug),
    ]
);

export const formSubmissions = snakeCase.table(
    "form_submissions",
    {
        id,
        formId: uuid()
            .references(() => forms.id, {
                onDelete: "cascade",
            })
            .notNull(),

        data: jsonb()
            .$type<Record<string, unknown>>()
            .notNull(),

        metadata: jsonb().$type<{
            userAgent?: string;
            ip?: string;
            source?: string;
        }>(),

        createdAt
    },
    (table) => [
        index("form_submissions_form_id_idx").on(table.formId),
    ]
);


