export type NavItem = {
    title: string
    url?: string
    items?: NavItem[]
}

export type NavDataType = {
    navMenuForCompany: NavItem[]
    navMenuForBranch: NavItem[]
}

export const navData: NavDataType = {
    navMenuForCompany: [
        {
            title: "Menu",

            items: [
                {
                    title: "Overviews",
                    url: "/dashboard/overviews",
                },
            ],
        },

        {
            title: "Manage",

            items: [
                {
                    title: "Courses",
                    url: "/dashboard/courses",
                },
                {
                    title: "Branches",
                    url: "/dashboard/branches",
                },
                {
                    title: "Branch Applications",
                    url: "/dashboard/branch-applications",
                },
            ],
        },
        {
            title: "Settings",

            items: [
                {
                    title: "Users",
                    url: "/dashboard/users",
                },
                {
                    title: "Roles & Permissions",
                    url: "/dashboard/roles-permissions",
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
                    url: "/dashboard/overviews",
                },
            ],
        },

        {
            title: "Students",

            items: [
                {
                    title: "Add Student",
                    url: "/dashboard/add-student",
                },
                {
                    title: "Student Lists",
                    url: "/dashboard/student-lists",
                },
            ],
        },
    ],
}
