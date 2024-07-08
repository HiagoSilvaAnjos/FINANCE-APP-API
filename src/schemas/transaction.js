import validator from "validator";
import { z } from "zod";

export const createTransactionSchema = z.object({
    user_id: z
        .string({
            required_error: "user_id is required"
        })
        .uuid(),
    name: z
        .string({
            required_error: "name to transaction is required"
        })
        .trim()
        .min(1, {
            message: "name is required"
        }),
    date: z
        .string({
            required_error: "date is required"
        })
        .datetime({
            message: "date is invalid"
        }),
    amount: z
        .number({
            invalid_type_error: "amount must be a number",
        })
        .min(1, {
            message: "amount must be greater than 0."
        })
        .refine((value) =>
            validator.isCurrency(value.toFixed(2), {
                digits_after_decimal: [2],
                allow_negatives: false,
                decimal_separator: "."
            })),
    type: z
        .enum(["EARNING", "EXPENSE", "INVESTMENT"])
});

export const updateTransactionSchema = createTransactionSchema.partial().strict({
    message: "Some fields privided not allowed"
});