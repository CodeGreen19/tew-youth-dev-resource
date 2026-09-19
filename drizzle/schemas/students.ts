import { snakeCase, varchar } from "drizzle-orm/pg-core"
import { createdAt, id, updatedAt } from "../helpers"

export const students = snakeCase.table("students", {
    id,

    name: varchar({ length: 255 }).notNull(),
    createdAt,
    updatedAt,
})
