import { auth } from "@/lib/auth"
import "server-only"
import slugify from "slugify"

export function generateSlug(name: string): string {
    return slugify(name, {
        lower: true,
        strict: true,
        trim: true,
    })
}

async function isSlugTaken(slug: string): Promise<boolean> {
    const existingOrg =
        await auth.api.checkOrganizationSlug({
            body: { slug },
        })
    return !existingOrg.status
}

export async function createUniqueOrgSlug(
    name: string,
): Promise<string> {
    const baseSlug = generateSlug(name)
    let candidateSlug = baseSlug
    let counter = 1

    while (await isSlugTaken(candidateSlug)) {
        candidateSlug = `${baseSlug}-${counter}`
        counter++
    }

    return candidateSlug
}
