"use client";

import { useTransition } from "react";
import { DynamicForm } from "@/features/admin/form-builder/components/dymamic-form";
import { FormDefinition } from "@/types/form";
import { addToForm } from "../server/actions";
import { toast } from "@/components/ui/toast";

export function ShowForm({
  form,
  formVersionId,
}: {
  form: FormDefinition;
  formVersionId: string;
}) {
  // 2. Initialize the transition hook
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (data: Record<string, any>) => {
    startTransition(async () => {
      const res = await addToForm({ formVersionId, data });
      toast.add({ title: res.message });
    });
  };

  return (
    <div>
      <DynamicForm
        onSubmit={handleSubmit}
        definations={form}
        isPending={isPending}
      />
    </div>
  );
}
