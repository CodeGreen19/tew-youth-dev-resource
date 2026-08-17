import { FieldType } from "@/constants/form";
import { FormField } from "@/types/form";

export function createField(type: FieldType): FormField {
    const id = crypto.randomUUID();

    return {
        id,
        type,
        name: `${type}_${id.slice(0, 6)}`,
        label: type,
        required: true,
        width: "full",
        defaultValue: "",
        validation: { minLength: 1 },
        placeholder: "",

    };
}