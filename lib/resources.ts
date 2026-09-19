export const resources = {
    company: {
        overview: ["view"] as const,
        branches: ["view"] as const,
        course: [
            "create",
            "view",
            "change-status",
            "update",
            "delete",
        ] as const,

        branch_application: ["view"] as const,
        users: ["view"] as const,
        roles_permissions: ["view"] as const,
    },

    branch: {
        students: ["view"] as const,
    },
}

export const {
    course,
    branch_application,
    overview,
    branches,
    users,
    roles_permissions,
} = resources.company
export const { students } = resources.branch
