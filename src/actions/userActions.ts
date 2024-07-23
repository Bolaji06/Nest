"use server";

import { editUserProfileSchema } from "@/utils/validation";
import { METHODS } from "http";
import next from "next";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ZodError } from "zod";

// get Users
let USER_ENDPOINT = "";

if (process.env.NODE_ENV === 'development'){
    USER_ENDPOINT = `${process.env.NEXT_PUBLIC_LOCAL_API_USER}`
}
else if (process.env.NODE_ENV === 'production'){
    USER_ENDPOINT = `${process.env.NEXT_PUBLIC_URL_USER}`
}
 export async function getUsers(){

    try{
        const response = await fetch(USER_ENDPOINT);
        const data = await response.json();

        return data;

    }catch(err){
        if (err instanceof Error){
            console.log(err);
        }
    }
}
// get user
export async function getUser(id: string){
    try{
        const token = cookies().get("token")?.value;
        if (!token){
            return { success: false, message: 'session expired' };
        }
        const options = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }

        const response = await fetch(`${USER_ENDPOINT}/${id}`, options);
        const data = await response.json();

        return data;

    }catch(err){
        if (err instanceof Error){
            console.log(err);
        }
    }
}
// update users

interface IUpdateUser {
    prevState: any;
    formData: FormData;
}
type FilteredFormData = {
    [key: string]: File | string; // or you can use FormDataEntryValue: from typescript lib.dom.d.ts
};
export async function updateUser(prevState: any, formData: FormData){
    try{

        // this filter out all non-provided values and let zod
        // validate field that are provided
        const formDataEntries = Object.fromEntries(formData.entries());
        const filteredFormData: FilteredFormData = Object.entries(formDataEntries).reduce((acc: FilteredFormData, [key, value]) => {
            if (value !== null && value !== ''){
                acc[key] = value
            }
            return acc;
        }, {})
        const updateUserSchema = editUserProfileSchema.parse(filteredFormData)
        
        const tokenId = cookies().get("token")?.value;
        const options = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tokenId
            },
            body: JSON.stringify(updateUserSchema),
            next: { tags: ["updateUser"] }
            
        }
        const userId = formData.get("userId")
        const response = await fetch(`${USER_ENDPOINT}/${userId}`, options);
        const data = await response.json();
        console.log(data)

        revalidateTag("updateUser")
        return data;
        
    }catch(err){
        if (err instanceof ZodError){
            const zodError = err.errors.map((issues) => {
                return issues
            })
            return zodError[0];
        }
    }
    redirect('/account')
}

export async function changeUserAvatar(id: string, fileUrl: string){

    try{
        const token = cookies().get("token")?.value;
        const options = {
          method: "PATCH",
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ avatar: fileUrl }),
          next: { tags: ['changeAvatar'] }
        }
        const response = await fetch(`${USER_ENDPOINT}/${id}`, options);
        const apiData = await response.json();
        revalidateTag('changeAvatar');
        return apiData;

      }catch(err){
        console.log(err);
      }
}
// delete