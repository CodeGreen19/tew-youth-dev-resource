import { FormDefinition } from "@/types/form";
import {
    boolean,
    index,
    integer,
    jsonb,
    snakeCase,
    text,
    unique,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../helpers";

export type FormSubmissionData = Record<
    string,
    string | number | boolean
>;

export type FormSubmissionMetadata = {
    userAgent?: string;
    ip?: string;
    source?: string;
};

export const forms = snakeCase.table(
    "forms",
    {
        id,

        name: varchar({ length: 255 })
            .notNull(),

        slug: varchar({ length: 255 })
            .notNull()
            .unique(),

        description: text(),

        isPublished: boolean()
            .default(false)
            .notNull(),

        createdAt,
        updatedAt,
    },
    (table) => [
        index("forms_slug_idx").on(table.slug),
        index("forms_published_idx").on(table.isPublished),
    ],
);

export const formVersions = snakeCase.table(
    "form_versions",
    {
        id,

        formId: uuid()
            .notNull()
            .references(() => forms.id, {
                onDelete: "cascade",
            }),

        version: integer()
            .notNull(),

        schema: jsonb()
            .$type<FormDefinition>()
            .notNull(),

        isPublished: boolean()
            .default(false)
            .notNull(),

        createdAt,
    },
    (table) => [
        index("form_versions_form_id_idx")
            .on(table.formId),

        unique("form_versions_form_id_version_unique")
            .on(table.formId, table.version),
    ],
);


export const formSubmissions = snakeCase.table(
    "form_submissions",
    {
        id,

        formVersionId: uuid()
            .notNull()
            .references(() => formVersions.id, {
                onDelete: "restrict",
            }),

        data: jsonb()
            .$type<FormSubmissionData>()
            .notNull(),

        metadata: jsonb()
            .$type<FormSubmissionMetadata>(),

        createdAt,
    },
    (table) => [
        index("form_submissions_form_version_id_idx")
            .on(table.formVersionId),

        index("form_submissions_created_at_idx")
            .on(table.createdAt),
    ],
);