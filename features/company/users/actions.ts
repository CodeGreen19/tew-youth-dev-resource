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

    const data = await auth.api.addMember({
        body: {
            role: "member",
            userId: "BENIYtMMCOlkQxs9e8fiBxKTvNeRi01Z",
        },
        headers: await headers(),
    })

    // const data = await auth.api.getOrganization({
    //     headers: await headers(),
    // })
    console.log(data)
}
