import { FieldType } from "@/constants/form";

export type FormField = {
    id: string;

    type: FieldType;

    name: string;

    label: string;

    description?: string;

    placeholder?: string;

    required?: boolean;

    defaultValue?: unknown;

    options?: {
        label: string;
        value: string;
    }[];

    validation?: {
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
        pattern?: string;
    };

    width?: "full" | "half" | "third";
};

export type FormDefinition = {
    version: number;

    name: string;

    description?: string;

    fields: FormField[];

    settings: {
        submitLabel: string;

        successMessage: string;

        redirectUrl?: string;
    };
};


export type RequiredFieldType = {
    label: string;
    description?: string;
    placeholder?: string;
}