"use server";

import { revalidateTag } from "next/cache";
import { useOptimistic } from "react";

const API_GET_POST = `http://localhost:7000/api/save-post`;

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
      //next: { tags: ["delete_saved_post"] }
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
