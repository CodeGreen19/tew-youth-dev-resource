import React from "react"
import { getUsers } from "../queries"
import ShowUsers from "../components/show-users"

export async function UsersPage() {
    const res = await getUsers()
    return (
        <div>
            {res.users.map((user) => (
                <div key={user.id}>
                    name:{user.name} email:{user.email}{" "}
                    role:{user.role}
                </div>
            ))}
            {res.total}
            <ShowUsers />
        </div>
    )
}
