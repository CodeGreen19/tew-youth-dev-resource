"use client";
import { useRouter } from "next/navigation";

import { useAppForm } from "@/components/form/use-app-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { useSelector } from "@tanstack/react-form";
import { addCourse, updateCourse } from "../actions";
import { courseSchema, CourseSchemaType } from "../schemas";
import { courseStatuses } from "@/constants/course";
import { capitalize } from "@/lib/helpers";
import { useMutation } from "@tanstack/react-query";

export function CourseForm({
  type,
  existedValue,
  onCancel,
  onSuccess,
}: {
  type: "UPDATE" | "ADD";
  existedValue?: CourseSchemaType & { id: string };
  onCancel?: () => void;
  onSuccess?: () => void;
}) {
  const router = useRouter();
  const defaultValues: CourseSchemaType = existedValue ?? {
    name: "",
    code: "",
    description: "",
    status: "active",
  };

  const addMutation = useMutation({
    mutationFn: addCourse,
    onSuccess: ({ message }) => {
      toast.add({ title: message, type: "success" });
      onSuccess?.();
      form.reset();
    },
    onError: ({ message }) => toast.add({ title: message, type: "error" }),
  });

  const updateMutation = useMutation({
    mutationFn: updateCourse,
    onSuccess: ({ message }) => {
      toast.add({ title: message, type: "success" });
      onSuccess?.();
      form.reset();
    },
    onError: ({ message }) => toast.add({ title: message, type: "error" }),
  });

  const form = useAppForm({
    defaultValues,
    validators: {
      onSubmit: courseSchema,
    },
    onSubmit: async ({ value }) => {
      if (type === "ADD") {
        addMutation.mutate(value);
      }
      if (type === "UPDATE" && existedValue) {
        updateMutation.mutate({ ...value, id: existedValue.id });
      }
    },
  });

  const isSubmitting = useSelector(form.store, (state) => state.isSubmitting);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{type === "ADD" ? "Add Course" : "Update Course"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="course-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.AppField
              name="name"
              children={(field) => <field.TextField label="Course Name" />}
            />
            <form.AppField
              name="code"
              children={(field) => <field.TextField label="Course Code" />}
            />
            <form.AppField
              name="status"
              children={(field) => (
                <field.SelectField
                  options={courseStatuses.map((v) => ({
                    label: capitalize(v),
                    value: v,
                  }))}
                  label="Course Code"
                />
              )}
            />
            <form.AppField
              name="description"
              children={(field) => (
                <field.TextareaField label="Course Description (optional)" />
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field className="justify-end" orientation={"horizontal"}>
          <Button
            onClick={() => {
              form.reset();
              onCancel?.();
            }}
            variant={"ghost"}
          >
            Cancel
          </Button>
          <Button disabled={isSubmitting} form={"course-form"} type="submit">
            {type === "ADD" ? "Submit" : " Update"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
