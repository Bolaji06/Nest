"use server";

import { cookies } from "next/headers";

const API_GET_POST = `http://localhost:7000/api/post`;
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
