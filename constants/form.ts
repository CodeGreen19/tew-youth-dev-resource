export const fieldTypes = [
    "text",
    "textarea",
    "email",
    "number",
    // "phone",
    // "select",
    // "radio",
    // "checkbox",
    // "date",
] as const;

export type FieldType = typeof fieldTypes[number];