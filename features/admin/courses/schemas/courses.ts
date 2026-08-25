import { z } from "zod";
export const courseSchema = z.object({
    name: z.string().min(1, "Name is required").max(255, "Name must be 255 characters or less"),
    code: z.string().min(1, "Code is required").max(100, "Code must be 100 characters or less"),
    description: z.string().nullable(),

});



export type Course = z.infer<typeof courseSchema>;
