import "server-only"
import { wait } from "../utils"

export async function sendResetPasswordEmail(
    email: string,
    url: string,
) {
    await wait()
    console.log(email, "mail send to=> ", email, url)
}
