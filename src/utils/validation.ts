import { z } from "zod";
import { userType } from "./links";

const USER_TYPE = ["renter", "rentee", "home_buyer", "home_seller", "other"] as const;

const numberSchema = z.coerce.number({ required_error: 'This field is required' }).min(1, { message: 'Value is too small'})

const amenitiesList = z.array(z.string());

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
    firstName: z.string({ required_error: 'First name is required'}).min(3, { message: 'First name is too short' }).optional(),
    lastName: z.string().min(3, { message: 'Last name is too short' }).optional(),
    userType: z.enum(USER_TYPE),
    location: z.string({ required_error: 'Location is required' }).optional(),
    phone: z.string().min(10, { message: 'Phone number is too short' }).optional(),
    about: z.string().min(10, { message: 'About is too short' }).optional(),
});

export const postSchema = z.object({
    // title/price details
    title: z.string().min(2, { message: 'Title is too short' }),
    price: numberSchema,

    // location details
    address: z.string().min(3, { message: 'Address is too short' }),
    city: z.string().min(0, { message: 'City is too short' }),
    longitude: z.string().min(0, { message: 'Longitude is too short' }),
    latitude: z.string().min(0, { message: 'Latitude is too short' }),

    // basic utils
    bedroom: numberSchema,
    bathroom: numberSchema,
    unitArea: numberSchema,

    //images: z.array(z.string().url()).nonempty(),

    // type: buy/rent
    type: z.enum(["buy", "rent"]),

    // property type: enum(apartment, house, condo, land)
    property: z.enum(["apartment", "house", "condo", "land"]),

    description: z.string().min(3, { message: 'Too short' }),

    amenities: z.object({
        roomDetails: z.object({
            appliance: amenitiesList,
            basement: z.enum(["finished", "unfinished", "partially_finished", "none"]),
            floorCovering: amenitiesList,
            rooms: amenitiesList,
            indoorFeatures: amenitiesList,
        }),
        utilitiesDetails: z.object({
            heatingType: amenitiesList,
            coolingType: amenitiesList,
            heatingFuel: amenitiesList,
        }),
        buildingDetails: z.object({
            buildingAmenities: amenitiesList,
            architecturalStyle: z.string(),
            exterior: amenitiesList,
            numUnit: z.coerce.number(),
            numFloor: z.coerce.number(),
            outdoorAmenities: amenitiesList,
            parking: amenitiesList,
            parkingSpace: z.coerce.number(),
            view: amenitiesList,
            roof: amenitiesList
        })
    })
});

export const sendEmailForm = z.object({
    to: z.string({required_error: 'Email is required'}).email({ message: 'Invalid email' }),
    from: z.string({required_error: 'Email is required'}).email({ message: 'Invalid email' }),
    message: z.string({required_error: 'Fill out the message' }),
    postId: z.string(),
});

export const updatePostSchema = z.object({
    title: z.string().min(5, { message: 'Title is too short' }).optional(),
    description: z.string().min(3, { message: 'Too short' }).optional(),
    price: numberSchema.optional(),
    bedroom: numberSchema.optional(),
    bathroom: numberSchema.optional(),
})



export type loginSchemaType = z.infer<typeof loginSchema>;
export type registerSchemaType = z.infer<typeof registerSchema>;
export type postSchemaType = z.infer<typeof postSchema>;
export type sendEmailFormType = z.infer<typeof sendEmailForm>;
export type updatePostType = z.infer<typeof updatePostSchema>;