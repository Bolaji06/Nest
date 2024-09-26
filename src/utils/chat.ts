
const CHAT_API = "http://localhost:7000/api/chat";
export async function getUsersChat(senderId: string, receiverId: string) {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["chat_messages"] }
    };
    const response = await fetch(
      `${CHAT_API}?senderId=${senderId}&receiverId=${receiverId}`,
      options
    );
    const data = response.json();
    return data;
  } catch (error) {
    if (error instanceof Error){
      console.log(error);
    }
  }
}
