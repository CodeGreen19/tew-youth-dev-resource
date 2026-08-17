import { FormDefinition } from "@/types/form";

export function createDefaultValues(
    definition: FormDefinition
) {
    const values: Record<string, unknown> = {};

    for (const field of definition.fields) {
        if (field.defaultValue !== undefined) {
            values[field.name] =
                field.defaultValue;

            continue;
        }

        // switch (field.type) {
        //     case "checkbox":
        //         values[field.name] = false;
        //         break;

        //     default:
        //         values[field.name] = "";
        // }
    }

    return values;
}