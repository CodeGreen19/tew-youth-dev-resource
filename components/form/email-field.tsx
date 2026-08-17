import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFieldContext } from "./use-app-form";
import { RequiredFieldType } from "@/types/form";

export function EmailField({
    label,
    description,
    placeholder
}: RequiredFieldType) {
    const field = useFieldContext<string>();
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
    return (
        <Field data-invalid={isInvalid}>
            {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
            <Input
                id={field.name}
                name={field.name}
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={isInvalid}
                placeholder={placeholder}
                autoComplete="off"
            />
            {description && <FieldDescription>{description}</FieldDescription>}
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
        </Field>
    );
}