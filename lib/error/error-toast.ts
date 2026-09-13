import { toast } from "@/components/ui/toast"

export function onErrorShowToast({
    message,
}: {
    message: string
}) {
    toast.add({ title: message, type: "error" })
}
