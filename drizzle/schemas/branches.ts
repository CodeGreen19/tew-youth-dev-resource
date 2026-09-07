import {
    snakeCase,
    text,
    varchar,
} from "drizzle-orm/pg-core"
import { createdAt, id, updatedAt } from "../helpers"

export const branchApplications = snakeCase.table(
    "branch_applications",
    {
        id,
        branchName: varchar({ length: 255 }).notNull(),
        ownerName: varchar({ length: 255 }).notNull(),
        status: text().default("pending"),
        description: text(),
        createdAt,
        updatedAt,
    },
)
