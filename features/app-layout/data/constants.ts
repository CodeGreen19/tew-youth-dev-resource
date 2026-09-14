export type NavDataType = {
    navMenuForCompany: {
        title: string
        items: { title: string; url: string }[]
    }[]
    navMenuForBranch: {
        title: string
        items: { title: string; url: string }[]
    }[]
}

export const navData: NavDataType = {
    navMenuForCompany: [
        {
            title: "Menu",

            items: [
                {
                    title: "Overviews",
                    url: "/company/overviews",
                },
            ],
        },

        {
            title: "Manage",

            items: [
                {
                    title: "Branches",
                    url: "/company/branches",
                },
                {
                    title: "Courses",
                    url: "/company/courses",
                },
                {
                    title: "Branch Applications",
                    url: "/company/branch-applications",
                },
            ],
        },
        {
            title: "Settings",

            items: [
                {
                    title: "Users",
                    url: "/company/users",
                },
                {
                    title: "Roles & Permissions",
                    url: "/company/roles-permissions",
                },
            ],
        },
    ],
    navMenuForBranch: [
        {
            title: "Menu",

            items: [
                {
                    title: "Overviews",
                    url: "/branch/overviews",
                },
            ],
        },

        {
            title: "Students",

            items: [
                {
                    title: "Add Student",
                    url: "/branch/add-student",
                },
                {
                    title: "Student Lists",
                    url: "/branch/student-lists",
                },
            ],
        },
    ],
}
