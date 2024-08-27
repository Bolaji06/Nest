"use server";

import { revalidateTag } from "next/cache";

let API_GET_POST = '';

if (process.env.NODE_ENV === 'production'){
  API_GET_POST = `${process.env.NEXT_PUBLIC_API_PROD_SAVE_POST}`;
}else if (process.env.NODE_ENV === 'development'){
  API_GET_POST = `${process.env.NEXT_PUBLIC_API_DEV_SAVE_POST}`
}

export async function addSavePost(id: string, token: string) {
  
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      postId: id,
    }),
    //next: { tags: ["add_saved_post"]}
  };

  try {
    const response = await fetch(API_GET_POST, option);
    const data = await response.json();

    revalidateTag("get_post")
    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
    }
  }
}

export async function removeSavedPost(postId: string, token: string){

  try{
    const option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        postId: postId
      }),
    }

    const response = await fetch(API_GET_POST, option);
    const data = response.json();

    revalidateTag("get_post")
    return data;

  }catch(err){
    if (err instanceof Error){
      console.log(err);
    }
  }

}
