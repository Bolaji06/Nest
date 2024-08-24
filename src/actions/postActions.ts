"use server";

import { cookies } from "next/headers";

let API_GET_POST = "";

if (process.env.NODE_ENV === 'production'){
  API_GET_POST = `${process.env.NEXT_PUBLIC_API_PROD_POST}`
}else if (process.env.NODE_ENV === 'development'){
  API_GET_POST = `${process.env.NEXT_PUBLIC_API_DEV_POST}`
}
export async function editSave(formData: FormData, id: string) {
  const token = cookies().get("token")?.value;

  if (!token) {
    return;
  }

  const option = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      isSaved: formData.get("isSaved")
    }),
  };

  try {
    const response = await fetch(`${API_GET_POST}/${id}`, option);
    const data = await response.json();
    return data;

  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
    }
  }
}
