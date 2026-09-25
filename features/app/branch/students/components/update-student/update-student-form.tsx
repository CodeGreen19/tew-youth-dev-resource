"use client"

import { useState } from "react"

import { FormSteps } from "@/components/form-steps/form-steps"
import { FormStepsNavigation } from "@/components/form-steps/form-steps-navigation"
import { useFormStepsStore } from "@/hooks/use-form-steps-store"
import { FormStepsType } from "@/types/steps"
import { getPaidStudentByEnrolledId } from "../../queries"
import { UpdateStudentSchemaType } from "../../schemas"
import { useMutation } from "@tanstack/react-query"
import { updateStudent } from "../../actions"
import { PersonalInformationForm } from "./personal-info-form"
import { AcademicInformationForm } from "./academic-info-form"
import { AvatarObjSchema } from "@/features/app/schemas"
import { StudentFormPreview } from "./student-form-preview"

const formSteps = [
    {
        id: "personal",
        title: "Personal",
        description: "Personal information",
        formId: "student-personal-information-form",
    },
    {
        id: "academic",
        title: "Academic",
        description: "Academic information",
        formId: "student-academic-information-form",
    },

    {
        id: "preview",
        title: "Preview",
        description: "Confirm details",
        formId: "student-preview-form",
    },
] satisfies readonly FormStepsType[]

export function UpdateStudentForm({
    student,
    enrollmentId,
}: {
    student: Awaited<
        ReturnType<typeof getPaidStudentByEnrolledId>
    >
    enrollmentId: string
}) {
    const { currentStep, nextStep, setStep } =
        useFormStepsStore()

    const [studentForm, setStudentForm] =
        useState<UpdateStudentSchemaType>({
            ...student,
            image: null as unknown as AvatarObjSchema,
            academicInformation: student.qualifications,
            existingImage: student.image,
            email: student.email ?? undefined,
        })

    const formId = formSteps[currentStep].formId

    const mutation = useMutation({
        mutationFn: updateStudent,
        onSuccess: () => {
            setStep(0)
        },
    })

    const updateStudentForm = <
        T extends Partial<UpdateStudentSchemaType>,
    >(
        values: T,
    ) => {
        setStudentForm((existing) => ({
            ...existing,
            ...values,
        }))
    }

    return (
        <div className="mt-6 space-y-8 pb-10">
            <div className="m-auto max-w-7xl">
                <FormSteps steps={formSteps} />
            </div>

            <div className="m-auto max-w-xl px-4 pt-6 lg:px-0">
                <div className="space-y-8">
                    {currentStep === 0 ? (
                        <PersonalInformationForm
                            existedValues={studentForm}
                            formId={formId}
                            onSuccess={(values) => {
                                updateStudentForm(values)

                                nextStep()
                            }}
                        />
                    ) : currentStep === 1 ? (
                        <AcademicInformationForm
                            existedValues={studentForm}
                            formId={formId}
                            onSuccess={(values) => {
                                updateStudentForm(values)

                                nextStep()
                            }}
                        />
                    ) : currentStep === 2 ? (
                        <StudentFormPreview
                            studentForm={studentForm}
                        />
                    ) : null}

                    <FormStepsNavigation
                        showSubmitButton={
                            currentStep + 1 ===
                            formSteps.length
                        }
                        onSubmit={() =>
                            mutation.mutate({
                                ...studentForm,
                                enrollmentId,
                            })
                        }
                        submitPending={mutation.isPending}
                        formId={formId}
                    />
                </div>
            </div>
        </div>
    )
}
