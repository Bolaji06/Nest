"use server";

import { forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema } from "@/utils/validation";
import { cookies } from "next/headers";
import { ZodError } from "zod";

let AUTH_ENDPOINT = "";

if (process.env.NODE_ENV === 'production'){
  AUTH_ENDPOINT = `${process.env.NEXT_PUBLIC_BASE_URL}`
}else if (process.env.NODE_ENV === 'development'){
  AUTH_ENDPOINT = `${process.env.NEXT_PUBLIC_API_AUTH}`
}
export async function loginAction(prevState: any, formData: FormData) {
  try {
    const parseSchema = loginSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parseSchema),
    };
    const response = await fetch(`${AUTH_ENDPOINT}/login`, options);
    const data = await response.json();

    const { success, message, ...userDetails } = data;

    cookies().set('token', data?.jwtToken, {
      expires: new Date(Date.now() + 360000 * 10),
      httpOnly: true, // change this when deploying
    });

    return data;
  } catch (err) {
    if (err instanceof ZodError) {
      const validationError = err.errors.map((issues) => ({
        field: issues.path[0],
        status: issues.message,
      }));
      return validationError[0];
    }
  }
}
export async function registerAction(prevState: any, formData: FormData) {
  try {
    const parseSchema = registerSchema.parse({
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
    });
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parseSchema),
    };
    const response = await fetch(`${AUTH_ENDPOINT}/register`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    if (err instanceof ZodError) {
      const validationError = err.errors.map((issues) => ({
        field: issues.path[0],
        status: issues.message,
      }));
      return validationError[0];
    }
  }
}

export async function forgotPasswordAction(prevState: any, formData: FormData){
  try{
    const parseSchema = forgotPasswordSchema.parse({
      email: formData.get('email')
    });
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(parseSchema)
    }

    const response = await fetch(`${AUTH_ENDPOINT}/forgot-password`, options);
    const data = await response.json();

    return data;

  }catch(err){
    if (err instanceof ZodError){
     const validationError = err.errors.map((issues) => ({
        status: issues.message,
        field: issues.path[0]
      }))
      return validationError[0];
    }
  }
}

export async function resetPasswordAction(prevState: any, formData: FormData) {

  try{
    const parseSchema = resetPasswordSchema.parse({
      password: formData.get('password'),
      confirm: formData.get('confirm'),
      token: formData.get("token")
    })
    const { confirm, ...bodyData } = parseSchema;

    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData)
    }

    const response = await fetch(`${AUTH_ENDPOINT}/reset-password`, options);
    const data = await response.json();

    return data;

  }catch(err){
    if(err instanceof ZodError){
      const validationError = err.errors.map((issues) => ({
        status: issues.message,
        field: issues.path[0]
      }))
      return validationError[0];
    }
  }
  
}
