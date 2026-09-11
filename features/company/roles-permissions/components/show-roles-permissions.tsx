"use client"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { toast } from "@/components/ui/toast"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { updateRolePermission } from "../actions"
import { RolesAndPermissions } from "../types"
import { Permissions } from "./permissions"
import { RoleSelect } from "./roles-select"

export function ShowRolesPermissions({
    rolesAndPermissions,
}: {
    rolesAndPermissions: RolesAndPermissions
}) {
    const [selectedRole, setSelectedRole] = useState("")

    const existedPermissionsOfRole =
        rolesAndPermissions.find(
            (item) => item.role === selectedRole,
        )?.permission ?? {}

    const [permissions, setPermissions] = useState<
        Record<string, string[]>
    >({})

    const updateRoleMutation = useMutation({
        mutationFn: updateRolePermission,
        onSuccess: ({ message }) => {
            toast.add({ title: message })
        },
        onError: ({ message }) => {
            toast.add({ title: message })
        },
    })

    useEffect(() => {
        setPermissions(existedPermissionsOfRole)
    }, [selectedRole])

    return (
        <FieldGroup>
            <Field>
                <FieldLabel>Roles</FieldLabel>
                <RoleSelect
                    selectRole={selectedRole}
                    setSelectRole={setSelectedRole}
                    roles={rolesAndPermissions.map(
                        (r) => r.role,
                    )}
                />
            </Field>
            <Field>
                <FieldLabel>Permissions</FieldLabel>

                <Permissions
                    permissions={permissions}
                    onValueChange={(
                        resource,
                        permission,
                        checked,
                    ) => {
                        setPermissions((prev) => {
                            const currentPermissions =
                                prev[resource] || []

                            const updatePermissions =
                                checked
                                    ? [
                                          ...currentPermissions,
                                          permission,
                                      ]
                                    : currentPermissions.filter(
                                          (p) =>
                                              p !==
                                              permission,
                                      )

                            return {
                                ...prev,
                                [resource]:
                                    updatePermissions,
                            }
                        })
                    }}
                />
            </Field>
            {selectedRole && (
                <Field
                    orientation={"horizontal"}
                    className="justify-center"
                >
                    <Button
                        onClick={() =>
                            updateRoleMutation.mutate({
                                permission: permissions,
                                roleName: selectedRole,
                            })
                        }
                        disabled={
                            updateRoleMutation.isPending
                        }
                    >
                        Update Changes
                    </Button>
                </Field>
            )}
        </FieldGroup>
    )
}
