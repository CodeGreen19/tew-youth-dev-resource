import { db } from "@/drizzle/db"
import { users } from "@/drizzle/schema"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const res = await db.select().from(users)
    if (res.length > 0) {
        return NextResponse.json({
            message: "user already exist",
        })
    }
    const user = await auth.api.signUpEmail({
        body: {
            name: "ahmed",
            email: "ahmed@gmail.com",
            password: "ahmed123",
        },

        headers: await headers(),
    })
    await db.update(users).set({ role: "admin" })

    // await auth.api.signInEmail({
    //     body: {
    //         email: "ahmed@gmail.com",
    //         password: "ahmed123",
    //     },
    // })
    // const metadata = { someKey: "someValue" }
    // try {
    //     const data = await auth.api.createOrganization({
    //         body: {
    //             name: "My Organization", // required, The organization name.
    //             slug: "my-org", // required, The organization slug.
    //             logo: "https://res.cloudinary.com/ddyrlplxn/image/upload/v1788849883/Testing/file_snoepb.png", // The organization logo.
    //             metadata, // The metadata of the organization.
    //             keepCurrentActiveOrganization: false, // Whether to keep the current active organization active after creating a new one.
    //         },
    //         // This endpoint requires session cookies.
    //         headers: await headers(),
    //     })
    return NextResponse.json({ user })
    // } catch (error) {
    //     return NextResponse.json({ error })
    // }
}
