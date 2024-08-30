"use server";

import { ZodError } from 'zod';
import { sendEmailForm } from '../../src/utils/validation'

const API = ""
export async function sendEmail(prevState: any, formData: FormData){

    try {
        const parseEmailSchema = sendEmailForm.parse({
            to: formData.get("to"),
            from: formData.get("from"),
            message: formData.get("message"),
        });

        const options = {
            method: "POST",
            'Content-Type': 'application/json',
            body: JSON.stringify(parseEmailSchema)
        }
        const data = await fetch(API, options);
        const response = await data.json();

        return response;

        //console.log("Sent")


    }catch(err){
        if (err instanceof ZodError){
            const validationError = err.errors.map((issues) => ({
                field: issues.path[0],
                status: issues.message,
              }));
              return validationError[0];
        }
    }
}