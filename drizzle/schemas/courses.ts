import {
    index,
    pgEnum,
    snakeCase,
    text,
    varchar
} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../helpers";
import { courseStatuses } from "@/constants/course";


export const statusEnum = pgEnum('status', courseStatuses);


export const courses = snakeCase.table(
    "courses",
    {
        id,

        name: varchar({ length: 255 })
            .notNull(),


        code: varchar({ length: 100 }).notNull().unique(),
        status: statusEnum().notNull().default("active"),
        description: text(),
        createdAt,
        updatedAt,
    },

);
