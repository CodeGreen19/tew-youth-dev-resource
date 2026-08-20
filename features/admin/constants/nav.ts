export type NavDataType = {
    navMain: {
        title: string,
        items: { title: string, url: string }[]

    }[]
}
export const navData: NavDataType = {
    navMain: [
        {
            title: "Menu",

            items: [
                {
                    title: "Dashboard",
                    url: "/admin/dashboard",
                }, {
                    title: "Branches",
                    url: "/admin/branches",
                },

            ],
        },
        {
            title: "Service",

            items: [


                {
                    title: "Form Builder",
                    url: "/admin/form-builder",
                },

            ],
        },


    ],
}