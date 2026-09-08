"use client"
import { AddressDetailsForm } from "../components/apply-branch/address-details-form"
import { BranchDetailsForm } from "../components/apply-branch/branch-details-form"
import { OnboardingNavigation } from "../components/apply-branch/onboarding-navigation"
import { OnboardingSteps } from "../components/apply-branch/onboardong-steps"
import { OwnerInfoForm } from "../components/apply-branch/owner-info-form"
import { onboardingSteps } from "../constants"
import { useOnboardingStore } from "../hooks/use-onboarding-store"

export function ApplyBranchPage() {
    const { currentStep } = useOnboardingStore()

    return (
        <div className="space-y-8  mt-6 pb-10">
            <div className="max-w-7xl m-auto">
                <OnboardingSteps steps={onboardingSteps} />
            </div>
            <div className="max-w-lg m-auto pt-6 px-4 lg:px-0">
                <div className="space-y-8">
                    {currentStep === 0 ? (
                        <BranchDetailsForm
                            nextStepId={
                                onboardingSteps[1].id
                            }
                        />
                    ) : currentStep === 1 ? (
                        <OwnerInfoForm
                            nextStepId={
                                onboardingSteps[2].id
                            }
                        />
                    ) : currentStep === 2 ? (
                        <AddressDetailsForm
                            nextStepId={
                                onboardingSteps[3].id
                            }
                        />
                    ) : null}

                    <OnboardingNavigation
                        {...onboardingSteps[currentStep]}
                    />
                </div>
            </div>
        </div>
    )
}
