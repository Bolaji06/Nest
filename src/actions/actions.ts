
import { loginSchema, registerSchema } from "@/utils/validation";
import { ZodError } from "zod";

export async function loginAction(prevState: any, formData: FormData) {
    const API_ENDPOINT = 'http://localhost:7000/api/auth/login'
    try{
        const parseSchema = loginSchema.parse({
            email: formData.get("email"),
            password: formData.get("password")
        });
        const options = {
            method: "POST",
            headers: {
               'Content-Type': 'application/json', 
            },
            body: JSON.stringify(parseSchema)
        }
        const response = await fetch(API_ENDPOINT, options);
        const data = await response.json();

        return data;

    }catch(err){
        if (err instanceof ZodError){
             const validationError = err.errors.map((issues) => ({
                field: issues.path[0],
                status: issues.message,
             }))
             return validationError[0];
        }
    }  
}

export async function registerAction(prevState: any, formData: FormData){
    const API_ENDPOINT = "http://localhost:7000/api/auth/register";
    try {
        const parseSchema = registerSchema.parse({
            email: formData.get('email'),
            username: formData.get('username'),
            password: formData.get('password')
        })
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parseSchema),
        }
        const response = await fetch(API_ENDPOINT, options);
        const data = await response.json();

        return data;
    }catch(err){
        if (err instanceof ZodError){
            const validationError = err.errors.map((issues) => ({
                field: issues.path[0],
                status: issues.message,
            }))
            return validationError[0];
        }
    }
}