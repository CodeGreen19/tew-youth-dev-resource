"use client"

import { Button } from "@/components/ui/button"
import { MoveLeft, MoveRight } from "lucide-react"
import { useOnboardingStore } from "../../hooks/use-onboarding-store"

export function OnboardingNavigation({
    formId,
    onSubmit,
    showSubmitButton,
}: {
    formId: string
    showSubmitButton: boolean
    onSubmit: () => void
}) {
    const { currentStep, previousStep } =
        useOnboardingStore()

    const handleBack = () => {
        previousStep()
    }

    return (
        <div className="flex justify-center items-center gap-3">
            <Button
                variant="outline"
                type="button"
                onClick={handleBack}
                disabled={currentStep === 0}
            >
                <MoveLeft /> Back
            </Button>
            {showSubmitButton ? (
                <Button
                    onClick={onSubmit}
                    variant="default"
                    type="submit"
                    form={formId}
                >
                    Submit Form
                </Button>
            ) : (
                <Button
                    variant="outline"
                    type="submit"
                    form={formId}
                >
                    Next <MoveRight />
                </Button>
            )}
        </div>
    )
}
