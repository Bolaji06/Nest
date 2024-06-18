import { loginSchema, registerSchema } from "@/utils/validation";
import { ZodError } from "zod";

let AUTH_ENDPOINT = "";

if (process.env.NEXT_PUBLIC_NODE_ENV === "production") {
  AUTH_ENDPOINT = `${process.env.NEXT_PUBLIC_API_AUTH}`;
} else if (process.env.NODE_ENV === "development") {
  AUTH_ENDPOINT = `${process.env.NEXT_PUBLIC_API_AUTH}`;
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
