"use server";

const API_GET_POST = `http://localhost:7000/api/save-post`;

export async function editPost(id: string, token: string) {
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      postId: id,
    }),
  };

  try {
    const response = await fetch(`${API_GET_POST}`, option);
    const data = await response.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
    }
  }
}
