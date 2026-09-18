import { toast } from "@/components/ui/toast"

export function onSuccessShowToast({
    message,
}: {
    message: string
}) {
    toast.add({ title: message, type: "success" })
}
