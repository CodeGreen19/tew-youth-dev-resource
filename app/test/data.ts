export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

export const payments: Payment[] = [
    { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com" },
    { id: "489e1d42", amount: 125, status: "processing", email: "example@gmail.com" },
    { id: "a1b2c3d4", amount: 45, status: "success", email: "user1@outlook.com" },
    { id: "e5f6g7h8", amount: 310, status: "failed", email: "john.doe@company.com" },
    { id: "i9j0k1l2", amount: 15, status: "success", email: "alice_smith@yahoo.com" },
    { id: "m3n4o5p6", amount: 85, status: "pending", email: "bob.miller@gmail.com" },
    { id: "q7r8s9t0", amount: 220, status: "success", email: "charlie.brown@proton.me" },
    { id: "u1v2w3x4", amount: 60, status: "processing", email: "david.w@techcorp.io" },
    { id: "y5z6a7b8", amount: 140, status: "failed", email: "emma.jones@domain.com" },
    { id: "c9d0e1f2", amount: 195, status: "success", email: "franklin@service.net" },
    { id: "g3h4i5j6", amount: 30, status: "pending", email: "grace.hopp@edu.org" },
    { id: "k7l8m9n0", amount: 500, status: "success", email: "hq_finance@store.com" },
    { id: "o1p2q3r4", amount: 75, status: "processing", email: "ian.malcolm@jurassic.com" },
    { id: "s5t6u7v8", amount: 110, status: "success", email: "julia_r@website.co" },
    { id: "w9x0y1z2", amount: 250, status: "failed", email: "kevin@agency.biz" },
    { id: "b3c4d5e6", amount: 40, status: "success", email: "laura.b@design.studio" },
    { id: "f7g8h9i0", amount: 135, status: "pending", email: "michael_s@dunder.com" },
    { id: "j1k2l3m4", amount: 90, status: "success", email: "nancy.d@grid.network" },
    { id: "n5o6p7q8", amount: 180, status: "processing", email: "oscar.w@theatre.org" },
    { id: "r9s0t1u2", amount: 65, status: "success", email: "pam_bees@paper.com" },
    { id: "v3w4x5y6", amount: 325, status: "failed", email: "quentin@tarantino.film" },
    { id: "z7a8b9c0", amount: 20, status: "success", email: "rachel.green@cafe.com" },
    { id: "d1e2f3g4", amount: 155, status: "pending", email: "sam_winchester@hunter.org" },
    { id: "h5i6j7k8", amount: 410, status: "success", email: "tony@starkindustries.com" },
    { id: "l9m0n1o2", amount: 95, status: "processing", email: "vector.prime@cyber.io" }
]
