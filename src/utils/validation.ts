import { z } from "zod";
import { userType } from "./links";

const USER_TYPE = ["renter", "rentee", "home_buyer", "home_seller", "other"] as const;

export const loginSchema = z.object({
    email: z.string().min(0, { message: 'Email cannot be empty' }).email({ message: 'enter a valid email address'}).trim(),
    password: z.string({ required_error: 'password is required' }).min(4, { message: 'password must contain at least (4) character'}).max(15, { message: 'Password too long' }).trim(),
});

export const registerSchema = z.object({
    email: z.string().min(0, { message: 'Email cannot be empty' }).email({ message: 'enter a valid email address'}).trim(),
    password: z.string({ required_error: 'password is required' }).min(4, { message: 'password must contain at least (4) character'}).max(15, { message: 'Password too long' }).trim(),
    username: z.string({required_error: 'username is required' }).min(4, { message: 'username must contain at least (4) character' }).max(20, { message: 'username is too long'}).trim()
});

export const resetPasswordSchema = z.object({
    password: z.string({ required_error: 'password is required' }).min(4, { message: 'password must contain at least (4) character'}).max(15, { message: 'Password too long' }).trim(),
    confirm: z.string({ required_error: 'password is required' }).min(4, { message: 'password must contain at least (4) character'}).max(15, { message: 'Password too long' }).trim(),
    token: z.string()
}).refine((data) => data.password === data.confirm, { message: 'Password must match', path: ["confirm"] });

export const forgotPasswordSchema = z.object({
    email: z.string().email({ message: 'provide a valid email' })
});

export const editUserProfileSchema = z.object({
    username: z.string({required_error: 'username is required' }).min(2, { message: 'username must contain at least (4) character' }).max(20, { message: 'username is too long'}).trim().optional(),
    avatar: z.instanceof(File).refine((file) => {
        const fileType = ["image/png", "image/jpg"];
        return fileType.includes(file.type);
    }, { message: "File must be an image" })
    .refine((file) => {
        const fileSize = 2 * 1024 * 1024;
        return file.size <= fileSize;
    }, { message: 'File size must be less than 2MB'}).optional(),
    password: z.string({ required_error: 'password is required' }).min(4, { message: 'password must contain at least (4) character'}).max(15, { message: 'Password too long' }).trim().optional(),
    email: z.string().email({ message: 'enter a valid email address'}).trim().optional(),
    userType: z.enum(USER_TYPE),
});

export const postSchema = z.object({
    // title/price details
    title: z.string().min(2, { message: 'Title is too short' }),
    price: z.coerce.number(),

    // location details
    address: z.string().min(3, { message: 'Address is too short' }),
    city: z.string().min(0, { message: 'City is too short' }),
    longitude: z.string().min(0, { message: 'Longitude is too short' }),
    latitude: z.string().min(0, { message: 'Latitude is too short' }),

    // basic utils
    bedroom: z.coerce.number(),
    bathroom: z.coerce.number(),

    //images: z.array(z.string().url()).nonempty(),

    // type: buy/rent
    type: z.enum(["buy", "rent"]),

    // property type: enum(apartment, house, condo, land)
    property: z.enum(["apartment", "house", "condo", "land"]),

    description: z.string().min(3, { message: 'Too short' }),
});

export type loginSchemaType = z.infer<typeof loginSchema>;
export type registerSchemaType = z.infer<typeof registerSchema>;
export type postSchemaType = z.infer<typeof postSchema>;