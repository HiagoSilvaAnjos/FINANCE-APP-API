import { z } from "zod";

export const createUserSchema = z.object({
  first_name: z
    .string({
      required_error: "First_name is required",
    })
    .trim()
    .min(1, {
      message: "Please privided a valid first_name",
    }),
  last_name: z
    .string({
      required_error: "Last_name is required",
    })
    .trim()
    .min(1, {
      message: "Please privided a valid last_name",
    }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .trim()
    .email({
      message: "Please provide a valid email",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .trim()
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
});

export const updateUserSchema = createUserSchema.partial().strict({
  message: "Some fields privided not allowed",
});

export const loginSchema = z.object({
  email: z
    .string()
    .email({
      message: "Please provide a valid email",
    })
    .trim()
    .min(1, {
      message: "email is required",
    }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const refreshTokenSchema = z.object({
  refreshToken: z
    .string()
    .trim()
    .min(1, { message: "Refresh token is required" }),
});

export const getUserBalanceSchema = z.object({
  user_id: z.string().uuid({ message: "Invalid user id" }),
  from: z.string().date(),
  to: z.string().date(),
});
