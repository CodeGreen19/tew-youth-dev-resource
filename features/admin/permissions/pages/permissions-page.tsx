// "use client"

// import { useState } from "react"

export function PermissionsPage() {
    return <div>PermissionsPage</div>
}

// import { Checkbox } from "@/components/ui/checkbox"
// import { Field, FieldLabel } from "@/components/ui/field"

// type PermissionCategory = "course" | "branches" | "users"

// type SelectedPermissions = Record<
//     PermissionCategory,
//     Record<string, boolean>
// >

// const initialPermissions: SelectedPermissions = {
//     course: {},
//     branches: {},
//     users: {},
// }

// export function PermissionsPage() {
//     const [selectedPermissions, setSelectedPermissions] =
//         useState<SelectedPermissions>(initialPermissions)

//     const handleToggle = (
//         category: PermissionCategory,
//         permission: string,
//         checked: boolean,
//     ) => {
//         setSelectedPermissions((prev) => ({
//             ...prev,
//             [category]: {
//                 ...prev[category],
//                 [permission]: checked,
//             },
//         }))
//     }

//     return (
//         <div className="p-6">
//             <h1 className="mb-6 text-2xl font-bold">
//                 Permissions
//             </h1>

//             <div className="space-y-6">
//                 <PermissionSection
//                     title="Courses"
//                     category="course"
//                     selected={selectedPermissions.course}
//                     onToggle={handleToggle}
//                 />

//                 <PermissionSection
//                     title="Branches"
//                     category="branches"
//                     selected={selectedPermissions.branches}
//                     onToggle={handleToggle}
//                 />

//                 <PermissionSection
//                     title="Users"
//                     category="users"
//                     selected={selectedPermissions.users}
//                     onToggle={handleToggle}
//                 />
//             </div>
//         </div>
//     )
// }

// type PermissionSectionProps = {
//     title: string
//     category: PermissionCategory
//     selected: Record<string, boolean>
//     onToggle: (
//         category: PermissionCategory,
//         permission: string,
//         checked: boolean,
//     ) => void
// }

// function PermissionSection({
//     title,
//     category,
//     selected,
//     onToggle,
// }: PermissionSectionProps) {
//     const permissions = testingPermissions[category]

//     return (
//         <section className="space-y-2">
//             <h2 className="text-lg font-semibold">
//                 {title}
//             </h2>

//             <div className="space-y-2">
//                 {permissions.map((permission) => (
//                     <Field
//                         key={permission}
//                         orientation="horizontal"
//                         className="flex items-center gap-2"
//                     >
//                         <Checkbox
//                             id={`${category}-${permission}`}
//                             checked={!!selected[permission]}
//                             onCheckedChange={(checked) =>
//                                 onToggle(
//                                     category,
//                                     permission,
//                                     checked === true,
//                                 )
//                             }
//                         />

//                         <FieldLabel
//                             htmlFor={`${category}-${permission}`}
//                             className="cursor-pointer font-normal"
//                         >
//                             {permission}
//                         </FieldLabel>
//                     </Field>
//                 ))}
//             </div>
//         </section>
//     )
// }
