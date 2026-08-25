import {
    index,
    snakeCase,
    text,
    varchar
} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../helpers";


export const courses = snakeCase.table(
    "courses",
    {
        id,

        name: varchar({ length: 255 })
            .notNull(),


        code: varchar({ length: 100 }).notNull().unique(),
        description: text(),
        createdAt,
        updatedAt,
    },

);
