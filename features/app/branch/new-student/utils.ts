import "server-only"

import { txDB } from "@/drizzle/db"
import { enrollments } from "@/drizzle/schema"
import { desc, like } from "drizzle-orm"

const ROLL_PREFIX = "22"
const REGISTRATION_PREFIX = "4411"

const MAX_RETRIES = 3

function getNextNumber(
    lastNumber: string | undefined,
    prefix: string,
    digits: number,
) {
    if (!lastNumber) {
        return `${prefix}${"1".padStart(digits, "0")}`
    }

    const current = Number(lastNumber.slice(prefix.length))
    const next = current + 1

    if (next > 10 ** digits - 1) {
        throw new Error(
            `${prefix} number limit has been reached`,
        )
    }

    return `${prefix}${next.toString().padStart(digits, "0")}`
}

export async function generateEnrollmentNumbers() {
    for (
        let attempt = 0;
        attempt < MAX_RETRIES;
        attempt++
    ) {
        try {
            return await txDB.transaction(async (tx) => {
                const [lastRoll] = await tx
                    .select({
                        rollNumber: enrollments.rollNumber,
                    })
                    .from(enrollments)
                    .where(
                        like(
                            enrollments.rollNumber,
                            `${ROLL_PREFIX}%`,
                        ),
                    )
                    .orderBy(desc(enrollments.rollNumber))
                    .limit(1)

                const [lastRegistration] = await tx
                    .select({
                        registrationNumber:
                            enrollments.registrationNumber,
                    })
                    .from(enrollments)
                    .where(
                        like(
                            enrollments.registrationNumber,
                            `${REGISTRATION_PREFIX}%`,
                        ),
                    )
                    .orderBy(
                        desc(
                            enrollments.registrationNumber,
                        ),
                    )
                    .limit(1)

                return {
                    rollNumber: getNextNumber(
                        lastRoll?.rollNumber,
                        ROLL_PREFIX,
                        6,
                    ),
                    registrationNumber: getNextNumber(
                        lastRegistration?.registrationNumber,
                        REGISTRATION_PREFIX,
                        6,
                    ),
                }
            })
        } catch (error) {
            const cause =
                error instanceof Error
                    ? error.cause
                    : undefined

            const code =
                typeof cause === "object" &&
                cause !== null &&
                "code" in cause
                    ? cause.code
                    : undefined

            if (
                code !== "23505" ||
                attempt === MAX_RETRIES - 1
            ) {
                throw error
            }
        }
    }

    throw new Error("Unable to generate enrollment numbers")
}
