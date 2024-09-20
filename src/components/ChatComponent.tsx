"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { Check, CheckCheck, Send, X } from "lucide-react";
import { TPost } from "@/lib/definitions";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { formatDate, timeAgo } from "@/lib/utils";

interface IChatComponentProps {
  post: TPost;
  setToggleChat: (curState: boolean) => void;
  toggleChat: boolean;
  userId: string | undefined;
  receiverId?: string;
  status: string | undefined;
}

interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  chatId: string;
  text: string;
  status: "SENT" | "DELIVERED" | "READ";
  createdAt: string;
}
export default function ChatComponent({
  post,
  setToggleChat,
  toggleChat,
  userId,
  status,
}: IChatComponentProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [ws, setWs] = useState<WebSocket | null>(null);

  function closeChat() {
    setToggleChat(false);
  }

  useEffect(() => {
    // create a socket
    const socket = new WebSocket('ws://localhost:7000');

    // create a connection
    socket.onopen = (event) => {
      console.log('Connection open');
      setWs(socket);
    }

    // receive a message
    socket.onmessage = (message) => {
      console.log(JSON.parse(message.data)); // receive the message data
    }

    // cleanup: close connection when unmount
    return () => {
      socket.close();
    }
  }, [toggleChat]);

  const receiverId = post.userId;

  function sendMessage(){
    // send text message
    if (ws && inputText && inputText.trim()){
      ws.send(JSON.stringify({
        userId,
        receiverId,
        text: inputText
      }));
      setInputText("");
    }
  }


  return (
    <>
      <div
        className="chat-layout fixed z-40 bottom-8 right-7 min-w-96 h-[480px] max-h-[440px] bg-slate-100
        rounded-2xl overflow-hidden shadow-2xl"
      >
        <header className="px-3 py-2 border-b border-slate-300 flex justify-between">
          <div className="flex gap-3">
            <div className="">
              <Image
                src={post.user.avatar}
                alt="user profile image"
                width={500}
                height={500}
                className="h-9 w-9 aspect-square rounded-full"
              />
            </div>

            <div>
              <p className="text-sm font-semibold">{post.user.username}</p>
              <p className="online-status capitalize text-xs text-muted-foreground">
                {status}
              </p>
            </div>
          </div>

          <Button
            onClick={closeChat}
            className="p-2 bg-transparent cursor-pointer rounded-full hover:bg-slate-200"
          >
            <X className="text-gray-900" />
          </Button>
        </header>

        <div className="mt-3 pb-10 px-3 py-1 relative max-h-80 overflow-y-auto">
          {messages.map((message, index) => {
            return (
              <div
                key={index}
                className={`${clsx({
                  "ml-[10rem]": message.senderId,
                })} py-2 px-3 mb-3 text-sm rounded-2xl bg-sky-300/20 max-w-56`}
              >
                <div>
                  <p>{message?.text}</p>
                </div>

                <div className="flex justify-between items-center pt-1">
                  <div>
                    <p className="text-xs italic text-muted-foreground">
                      {timeAgo(message.createdAt)}
                    </p>
                  </div>
                  {message.status && (
                    <div>
                      {message.status === "READ" && (
                        <CheckCheck className="text-blue-600" size={14} />
                      )}
                      {message.status === "SENT" && (
                        <Check className="text-slate-400" size={14} />
                      )}
                      {message.status === "DELIVERED" && (
                        <CheckCheck className="text-gray-500" size={14} />
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-3 max-h-full absolute bottom-0 w-full mb-3">
          <div className="flex gap-2 justify-between items-center px-4 w-full h-full rounded-3xl border bg-slate-100  border-slate-300 focus-within:outline focus-within:outline-blue-500">
            <textarea
              value={inputText}
              name="input"
              onChange={(e) => setInputText(e.target.value)}
              className="w-full text-sm hide-scroll py-1 resize-none focus:border-none focus:outline-none  bg-transparent"
            ></textarea>

            <Button
              onClick={sendMessage}
              className="bg-transparent p-2 aspect-square text-center hover:bg-blue-300/20 text-brand-primary rounded-full"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
