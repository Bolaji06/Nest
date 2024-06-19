import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().min(0, { message: 'Email cannot be empty' }).email({ message: 'enter a valid email address'}).trim(),
    password: z.string({ required_error: 'password is required' }).min(4, { message: 'password must contain at least (4) character'}).max(15, { message: 'Password too long' }).trim(),
});

export const registerSchema = z.object({
    email: z.string().min(0, { message: 'Email cannot be empty' }).email({ message: 'enter a valid email address'}).trim(),
    password: z.string({ required_error: 'password is required' }).min(4, { message: 'password must contain at least (4) character'}).max(15, { message: 'Password too long' }).trim(),
    username: z.string({required_error: 'username is required' }).min(4, { message: 'username must contain at least (4) character' }).max(20, { message: 'username is too long'}).trim()
});

export const forgotPasswordSchema = z.object({
    email: z.string().email({ message: 'provide a valid email address' }).trim()
});

export type loginSchemaType = z.infer<typeof loginSchema>;
export type registerSchemaType = z.infer<typeof registerSchema>;