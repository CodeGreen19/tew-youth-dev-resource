import { getUsers } from "./queries";

export type User = Awaited<ReturnType<typeof getUsers>>["users"][number]