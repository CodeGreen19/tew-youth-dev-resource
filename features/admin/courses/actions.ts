"use server";

import { db } from "@/drizzle/db";
import { courses } from "@/drizzle/schema";
import { eq, inArray } from "drizzle-orm";
import { updateTag } from "next/cache";
import { CourseSchemaType, courseSchema } from "./schemas";
import { CourseStatus } from "@/constants/course";
import { withPermission } from "@/lib/dal";

export const addCourse = withPermission(
  { course: ["create"] },
  async (_, course: CourseSchemaType) => {
    const result = courseSchema.safeParse(course);

    if (!result.success) {
      throw new Error("Validation failed");
    }

    const existCode = await db.query.courses.findFirst({
      where: { code: result.data.code },
    });

    if (existCode) {
      throw new Error("Code already exists");
    }

    await db.insert(courses).values(result.data);

    updateTag("courses");

    return {
      message: "New Course Added",
    };
  },
);

export const updateCourse = withPermission(
  { course: ["update"] },
  async (
    _,
    course: CourseSchemaType & {
      id: string;
    },
  ) => {
    const result = courseSchema.safeParse(course);

    if (!result.success) {
      throw new Error("Validation failed");
    }

    const existCode = await db.query.courses.findFirst({
      where: {
        AND: [
          {
            code: {
              eq: result.data.code,
            },
          },
          {
            id: {
              ne: course.id,
            },
          },
        ],
      },
    });

    if (existCode) {
      throw new Error("Code already exists");
    }

    const updatedRows = await db
      .update(courses)
      .set(result.data)
      .where(eq(courses.id, course.id))
      .returning();

    if (updatedRows.length === 0) {
      throw new Error("Course not found");
    }

    updateTag("courses");

    return {
      message: "Course updated successfully",
    };
  },
);

export const deleteCourse = withPermission(
  { course: ["delete"] },
  async (_, id: string) => {
    const deletedRows = await db
      .delete(courses)
      .where(eq(courses.id, id))
      .returning({ id: courses.id });

    if (deletedRows.length === 0) {
      throw new Error("Course not found");
    }

    updateTag("courses");

    return {
      message: "Course deleted successfully",
    };
  },
);

export const changeCourseStatus = withPermission(
  { course: ["update"] },
  async (
    _,
    {
      id,
      status,
    }: {
      id: string;
      status: CourseStatus;
    },
  ) => {
    const updatedRows = await db
      .update(courses)
      .set({ status })
      .where(eq(courses.id, id))
      .returning({ id: courses.id });

    if (updatedRows.length === 0) {
      throw new Error("Course not found");
    }

    updateTag("courses");

    return {
      message: "Course status updated",
    };
  },
);

export const changeCourseStatusInBulk = withPermission(
  { course: ["update"] },
  async (
    _,
    {
      ids,
      status,
    }: {
      ids: string[];
      status: CourseStatus;
    },
  ) => {
    if (ids.length === 0) {
      throw new Error("No courses selected");
    }

    await db.update(courses).set({ status }).where(inArray(courses.id, ids));

    updateTag("courses");

    return {
      message: "Course status updated",
    };
  },
);
