"use server"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function addMember() {
    // const newUser = await auth.api.createUser({
    //     body: {
    //         name: "tarik2",
    //         email: "tarik2@gmail.com",
    //         password: "passcode",
    //         role: "user",
    //     },
    //     headers: await headers(),
    // })

    // const data = await auth.api.addMember({
    //     body: {
    //         role: "member",
    //         userId: "BENIYtMMCOlkQxs9e8fiBxKTvNeRi01Z",
    //     },
    //     headers: await headers(),
    // })
    // const data = await auth.api.createOrgRole({
    //     headers: await headers(),
    //     body: {
    //         role: "employee",
    //         permission: {
    //             course: ["view", "create", "update"],
    //         },
    //     },
    // })

    const d = await auth.api.listMembers({
        headers: await headers(),
    })
    // const data = await auth.api.updateMemberRole({
    //     body: {
    //         role: "employee",
    //         memberId: "Fdfr3e9CB31D6Z12wK6A353W0LF76UM2",
    //     },
    //     headers: await headers(),
    // })

    // const data = await auth.api.getOrganization({
    //     headers: await headers(),
    // })
    console.log(d)
}
