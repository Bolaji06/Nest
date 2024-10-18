"use server";

import { updatePostSchema } from "@/utils/validation";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import path, { parse } from "path";
import { ZodError } from "zod";

let API_GET_POST = "";

if (process.env.NODE_ENV === "production") {
  API_GET_POST = `${process.env.NEXT_PUBLIC_API_PROD_POST}`;
} else if (process.env.NODE_ENV === "development") {
  API_GET_POST = `${process.env.NEXT_PUBLIC_API_DEV_POST}`;
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
      isSaved: formData.get("isSaved"),
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

export async function updatePost(data: any, postId: string) {
  const tokenId = cookies().get("token")?.value;

  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenId,
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(`${API_GET_POST}/${postId}`, options);
    const data = await response.json();
    revalidateTag("all_posts");
    return data;
  } catch (error) {
    console.log(error);
  }
}
