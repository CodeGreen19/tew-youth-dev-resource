export const resources = {
    course: [
        "create",
        "view",
        "change-status",
        "update",
        "delete",
    ] as const,

    branch_application: ["view"] as const,
    overview: ["view"] as const,
    branch: ["view"] as const,
}

export const {
    course,
    branch_application,
    overview,
    branch,
} = resources
