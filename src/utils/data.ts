import { revalidateTag } from "next/cache";

const API_GET_POST = `http://localhost:7000/api/post`

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
    if (error instanceof Error){
      console.log(error.message)
    }
  }
}

export async function getAllPosts(){
  const options: RequestInit = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-store', 
  }
  try{
    const response = await fetch(API_GET_POST, options);
    const data = await response.json();
    return data;

  }catch(error){
    if (error instanceof Error){
      console.log(error.message)
    }
  }
}

export async function getPost(id: string){
  try {
    const response = await fetch(`${API_GET_POST}/${id}`);
    if (!response.ok){
      console.log(response.statusText);
    }
    const data = await response.json();   
    return data;

  }catch(error){
    if (error instanceof Error){
      console.log(error);
    }
  }
}
