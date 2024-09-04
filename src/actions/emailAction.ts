"use server";

import { ZodError } from "zod";
import { sendEmailForm } from "../../src/utils/validation";

let SHARE_EMAIL_API = "";

if (process.env.NODE_ENV === "production") {
  SHARE_EMAIL_API = `${process.env.NEXT_PUBLIC_API_PROD_SHARE_EMAIL}`;
} else if (process.env.NODE_ENV === "development") {
  SHARE_EMAIL_API = `${process.env.NEXT_PUBLIC_API_DEV_SHARE_EMAIL}`;
}
export async function sendEmail(prevState: any, formData: FormData) {
  try {
    const parseEmailSchema = sendEmailForm.parse({
      postId: formData.get("postId"),
      to: formData.get("to"),
      from: formData.get("from"),
      message: formData.get("message"),
    });

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parseEmailSchema),
    };
    const data = await fetch(SHARE_EMAIL_API, options);
    const response = await data.json();

    return response;
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
