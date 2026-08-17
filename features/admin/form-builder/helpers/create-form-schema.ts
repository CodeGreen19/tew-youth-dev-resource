import { FormDefinition } from "@/types/form";
import { z } from "zod";

export function createFormSchema(definition: FormDefinition) {
    const shape: Record<string, z.ZodTypeAny> = {};

    for (const field of definition.fields) {
        let schema: z.ZodTypeAny;

        switch (field.type) {
            case "text":
            case "textarea": {
                let stringSchema = z.string();
                if (field.validation?.minLength) {
                    stringSchema = stringSchema.min(field.validation.minLength);
                }
                if (field.validation?.maxLength) {
                    stringSchema = stringSchema.max(field.validation.maxLength);
                }
                schema = stringSchema;
                break;
            }
            case "email":
                schema = z.email();
                break;
            case "number":
                schema = z.number();
                break;
            default:
                schema = z.unknown();
        }

        if (!field.required) {
            schema = schema.optional();
        }

        shape[field.name] = schema;
    }

    return z.object(shape);
}
