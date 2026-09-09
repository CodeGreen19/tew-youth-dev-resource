"use client"
import { useState } from "react"
import { AddressDetailsForm } from "../components/apply-branch/address-details-form"
import { BranchDetailsForm } from "../components/apply-branch/branch-details-form"
import { OnboardingNavigation } from "../components/apply-branch/onboarding-navigation"
import { OnboardingSteps } from "../components/apply-branch/onboardong-steps"
import { OwnerInfoForm } from "../components/apply-branch/owner-info-form"
import { onboardingSteps } from "../constants"
import { useOnboardingStore } from "../hooks/use-onboarding-store"
import {
    branchApplicationDefaults,
    BranchApplicationSchemaType,
} from "../schemas"
import { DocumentsForm } from "../components/apply-branch/documents-form"
import { ApplicationFormPreview } from "../components/apply-branch/application-form-preview"

export function ApplyBranchPage() {
    const { currentStep, nextStep } = useOnboardingStore()

    const [applicationForm, setApplicationForm] =
        useState<BranchApplicationSchemaType>({
            ...branchApplicationDefaults,
        })

    const formId = onboardingSteps[currentStep].formId

    return (
        <div className="space-y-8  mt-6 pb-10">
            <div className="max-w-7xl m-auto">
                <OnboardingSteps steps={onboardingSteps} />
            </div>
            <div className="max-w-lg m-auto pt-6 px-4 lg:px-0">
                <div className="space-y-8">
                    {currentStep === 0 ? (
                        <BranchDetailsForm
                            existedValues={applicationForm}
                            formId={formId}
                            onSuccess={(v) => {
                                setApplicationForm(
                                    (existed) => ({
                                        ...existed,
                                        ...v,
                                    }),
                                )
                                nextStep()
                            }}
                        />
                    ) : currentStep === 1 ? (
                        <OwnerInfoForm
                            existedValues={applicationForm}
                            formId={formId}
                            onSuccess={(v) => {
                                setApplicationForm(
                                    (existed) => ({
                                        ...existed,
                                        ...v,
                                    }),
                                )
                                nextStep()
                            }}
                        />
                    ) : currentStep === 2 ? (
                        <AddressDetailsForm
                            existedValues={applicationForm}
                            formId={formId}
                            onSuccess={(v) => {
                                setApplicationForm(
                                    (existed) => ({
                                        ...existed,
                                        ...v,
                                    }),
                                )
                                nextStep()
                            }}
                        />
                    ) : currentStep === 3 ? (
                        <DocumentsForm
                            existedValues={applicationForm}
                            formId={formId}
                            onSuccess={(v) => {
                                setApplicationForm(
                                    (existed) => ({
                                        ...existed,
                                        ...v,
                                    }),
                                )
                                nextStep()
                            }}
                        />
                    ) : currentStep === 4 ? (
                        <ApplicationFormPreview
                            applicationForm={
                                applicationForm
                            }
                        />
                    ) : null}

                    <OnboardingNavigation
                        showSubmitButton={
                            currentStep + 1 ===
                            onboardingSteps.length
                        }
                        onSubmit={() =>
                            console.log(
                                applicationForm,
                                "data",
                            )
                        }
                        formId={formId}
                    />
                </div>
            </div>
        </div>
    )
}
