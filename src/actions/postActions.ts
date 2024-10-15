"use server";

import { updatePostSchema } from "@/utils/validation";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
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
  const apiUrl = "http://localhost:7000/api/post";
  const tokenId = cookies().get("token")?.value;

  const parseSchema = updatePostSchema.parse(data);

  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenId,
    },
    body: JSON.stringify(parseSchema),
  };

  try {
    const response = await fetch(`${apiUrl}/${postId}`, options);
    const data = await response.json();
    revalidateTag("all_posts");
    return data;
  } catch (error) {
    if (error instanceof ZodError) {
      const validateError = error.errors.map((issue) => {
        return {
          message: issue.message,
          path: issue.path,
        };
      });
      console.log(validateError);
      return validateError;
    }
  }
}
