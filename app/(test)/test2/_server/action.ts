"use server"

export async function getTest2() {
    await new Promise((res) => setTimeout(res, 1000))
}
