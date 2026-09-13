import {
    snakeCase,
    text,
    varchar,
} from "drizzle-orm/pg-core"
import { createdAt, id, updatedAt } from "../helpers"

export const tests = snakeCase.table("tests", {
    id,

    name: varchar({ length: 15 }).notNull(),
    code: varchar({ length: 100 }).notNull().unique(),
    description: text(),
    createdAt,
    updatedAt,
})
