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
    ],
}
