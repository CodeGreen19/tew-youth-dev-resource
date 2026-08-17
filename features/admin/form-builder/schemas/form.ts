import { fieldTypes } from "@/constants/form";
import { z } from "zod";



export const formFieldSchema = z.object({
    id: z.string(),
    type: z.enum(fieldTypes),
    name: z.string().min(1, "Name is required"),
    label: z.string(),
    description: z.string().optional(),
    placeholder: z.string().optional(),
    required: z.boolean().optional(),
    options: z
        .array(
            z.object({
                label: z.string(),
                value: z.string(),
            })
        )
        .optional(),
    validation: z
        .object({
            minLength: z.number().optional(),
            maxLength: z.number().optional(),
            min: z.number().optional(),
            max: z.number().optional(),
            pattern: z.string().optional(),
        })
        .optional(),
});


export type FormFieldSchemaType = z.infer<typeof formFieldSchema>;



export const formDefinitionSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    version: z.number(),
    settings: z.object({
        submitLabel: z.string(),
        successMessage: z.string(),
        redirectUrl: z.url().optional(),
    }),
});

export type FormDefinitionSchemaType = z.infer<typeof formDefinitionSchema>;
