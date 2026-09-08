import { ComponentType } from "react"

export type OnboardingStep = {
    id: string
    title: string
    description?: string
    formId: string
}
