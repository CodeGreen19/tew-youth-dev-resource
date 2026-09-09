import { OnboardingStep } from "./types"

export const onboardingSteps = [
    {
        id: "branch",
        title: "Branch",
        description: "Branch information",
        formId: "branch-details-form",
    },
    {
        id: "owner",
        title: "Owner",
        description: "Owner details",
        formId: "owner-info-form",
    },

    {
        id: "address",
        title: "Address",
        description: "Address of branch",
        formId: "address-details-form",
    },
    {
        id: "documents",
        title: "Docs",
        description: "Valid documents",
        formId: "branch-docs-form",
    },
    {
        id: "preview",
        title: "Preview",
        description: "Confirm details",
        formId: "branch-preview-form",
    },
] satisfies readonly OnboardingStep[]

export const BLOOD_GROUPS = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
]
export const GENDER = ["Male", "Female", "Other"]
