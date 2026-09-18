import "server-only"
import { Resend } from "resend"
import { ResetPasswordTemplate } from "./ui/reset-password-template"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmailResetPassword(
    email: string,
    url: string,
) {
    const res = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: ["delivered@resend.dev"],
        subject: "Reset your password",
        react: ResetPasswordTemplate({
            firstName: "John",
            url,
            email,
        }),
    })

    console.log("mail-res=>", res)
}
