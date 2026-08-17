import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { TextField } from "./text-field";
import { NumberField } from "./number-field";
import { EmailField } from "./email-field";
import { TextareaField } from "./textarea-field";


export const { fieldContext, formContext, useFieldContext, useFormContext } =
    createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
        TextField,
        NumberField,
        EmailField,
        TextareaField
    },
    formComponents: {},
});