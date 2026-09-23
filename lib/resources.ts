export const resources = {
    company: {
        overview: ["view"] as const,
        branches: [
            "view",
            "create",
            "update",
            "delete",
        ] as const,
        course: [
            "view",
            "create",
            "update",
            "delete",
            "change-status",
        ] as const,

        branch_application: [
            "view",
            "create",
            "update",
            "delete",
        ] as const,
        users: [
            "view",
            "create",
            "update",
            "delete",
        ] as const,
        roles_permissions: [
            "view",
            "create",
            "update",
            "delete",
        ] as const,
    },

    branch: {
        students: [
            "view",
            "create",
            "update",
            "delete",
        ] as const,
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
