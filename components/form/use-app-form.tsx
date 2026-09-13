import {
    createFormHook,
    createFormHookContexts,
} from "@tanstack/react-form"
import { TextField } from "./text-field"
import { NumberField } from "./number-field"

import { TextareaField } from "./textarea-field"
import { SelectField } from "./select-field"
import { CheckboxField } from "./checkbox-field"
import { FileField } from "./file-field"
import { AvatarField } from "./avater-field"
import { PasswordField } from "./password-field"

export const {
    fieldContext,
    formContext,
    useFieldContext,
    useFormContext,
} = createFormHookContexts()

export const { useAppForm, withForm } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
        TextField,
        PasswordField,
        NumberField,
        SelectField,
        CheckboxField,
        TextareaField,
        FileField,
        AvatarField,
    },
    formComponents: {},
})
