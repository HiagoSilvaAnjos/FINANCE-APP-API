import { z } from "zod";

export const createUserSchema = z.object({
    first_name: z
        .string({
            required_error: "First_name is required"
        })
        .trim()
        .min(1, {
            message: "Please privided a valid first_name"
        }),
    last_name: z
        .string({
            required_error: "Last_name is required"
        })
        .trim()
        .min(1, {
            message: "Please privided a valid last_name"
        }),
    email: z
        .string({
            required_error: "Email is required"
        })
        .trim()
        .email({
            message: "Please provide a valid email"
        }),
    password: z
        .string({
            required_error: "Password is required"
        })
        .trim()
        .min(6, {
            message: "Password must be at least 6 characters"
        }),
});

export const updateUserSchema = createUserSchema.partial().strict({
    message: "Some fields privided not allowed"
});