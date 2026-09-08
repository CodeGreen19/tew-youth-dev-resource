"use client"

import { Button } from "@/components/ui/button"
import { MoveLeft, MoveRight } from "lucide-react"
import { useOnboardingStore } from "../../hooks/use-onboarding-store"
import { useRouter, usePathname } from "next/navigation"

export function OnboardingNavigation({
    formId,
}: {
    formId: string
}) {
    const { currentStep, previousStep } =
        useOnboardingStore()
    const router = useRouter()
    const pathname = usePathname()

    const handleBack = () => {
        previousStep()
        router.replace(pathname)
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
            <Button
                variant="outline"
                type="submit"
                form={formId}
            >
                Next <MoveRight />
            </Button>
        </div>
    )
}
