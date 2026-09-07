export type NavDataType = {
    navMain: {
        title: string
        items: { title: string; url: string }[]
    }[]
}
export const navData: NavDataType = {
    navMain: [
        {
            title: "Menu",

            items: [
                {
                    title: "Overviews",
                    url: "/company/overviews",
                },
                {
                    title: "Branches",
                    url: "/company/branches",
                },
            ],
        },
        {
            title: "Feature",

            items: [
                {
                    title: "Courses",
                    url: "/company/courses",
                },
            ],
        },
        {
            title: "Manage",

            items: [
                {
                    title: "Branch Applications",
                    url: "/company/branch-applications",
                },
                {
                    title: "Users",
                    url: "/company/users",
                },
            ],
        },
    ],
}
