"use client"
import { useRouter } from "next/navigation"
import { UserForm } from "../components/user-form"

export function AddUserPage() {
    const router = useRouter()
    return (
        <div className="max-w-lg m-auto">
            <UserForm
                type="ADD"
                onSuccess={() =>
                    router.push("/admin/users")
                }
            />
        </div>
    )
}
