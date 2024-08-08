import next from "next";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const API_GET_POST = `http://localhost:7000/api/post`;

export async function getSearch(query: {}) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const params = new URLSearchParams(query).toString();
  
  const API_ENDPOINT = `${API_GET_POST}?${params}`;
  try {
    const response = await fetch(API_ENDPOINT, options);
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}

export async function getAllPosts() {
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    next: { tags: ["get_posts"] }
  };
  try {
    const response = await fetch(API_GET_POST, options);
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}

export async function getPost(id: string) {
  const token = cookies().get("token")?.value || "";

  //console.log(token)

  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
    next: { tags: ["get_post"] }
  };
  try {
    const response = await fetch(`${API_GET_POST}/${id}`, options);
    if (!response.ok) {
      console.log(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      //console.log(error);
    }
  }
}
