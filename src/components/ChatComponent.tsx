"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { Send, X } from "lucide-react";
import { TPost } from "@/lib/definitions";
import { useEffect, useRef, useState } from "react";

interface IChatComponentProps {
  post: TPost;
  setToggleChat: (curState: boolean) => void;
  toggleChat: boolean;
}
export default function ChatComponent({
  post,
  setToggleChat,
  toggleChat,
}: IChatComponentProps) {
  const[messages, setMessages] = useState<string[]>([]);
  const[input, setInput] = useState("");
  const ws = useRef<WebSocket | null>(null)

  function closeChat() {
    setToggleChat(false);
  }

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:7000');

    ws.current.onopen = () => {
      console.log('Connected to a WebSocket server');
    }
    ws.current.onmessage = (event: MessageEvent) => {
      const newMessage = event.data;
      setMessages((preState) => [...preState, newMessage]);
    }

    ws.current.onerror = (error) => {
      console.error(error);
    }
    ws.current.onclose = () => {
      console.log('connection close');
    }

    return () => {
      ws.current?.close();
    }
  }, [toggleChat])

  function sendMessage(){
    if (input.trim() && ws.current?.readyState === WebSocket.OPEN){
      ws.current.send(input);
      setInput("")
    }
  }

  console.log(messages);

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
              Offline
            </p>
          </div>
          </div>

          <Button onClick={closeChat} className="p-2 bg-transparent cursor-pointer rounded-full hover:bg-slate-200">
            <X className="text-gray-800"/>
          </Button>
        </header>

        <div className="mt-3 pb-10 px-3 py-1 relative max-h-80 overflow-y-auto">
           {
            messages.map((message, index) => {
              return (
                <div key={index} className="py-2 px-3 mb-3 text-sm rounded-2xl bg-sky-300/20 max-w-56">
                <div>
                  <p>
                   {message}
                  </p>
                </div>
    
                <div className="flex justify-between pt-1">
                  <div>
                    <p className="text-xs italic text-muted-foreground">
                      2 min ago
                    </p>
                  </div>
    
                </div>
              </div>
              )
            })
          } 
         

          <div className="py-2 px-3 mb-3 text-sm rounded-2xl ml-[9rem] bg-green-300/20 max-w-56">
            <div>
              <p>Hi Josh i want enquire about the house you posted on Nest</p>
            </div>

            <div className="flex justify-between pt-1">
              <div>
                <p className="text-xs italic text-muted-foreground">
                  2 min ago
                </p>
              </div>

              <div></div>
            </div>
          </div>

          <div className="py-2 px-3 mb-3 text-sm rounded-2xl bg-sky-300/20 max-w-56">
            <div>
              <p>
                Hi Josh i want enquire about the house you posted on Nest am
                hoping to get your phone number
              </p>
            </div>

            <div className="flex justify-between pt-1">
              <div>
                <p className="text-xs italic text-muted-foreground">
                  2 min ago
                </p>
              </div>

              <div></div>
            </div>
          </div>

          <div className="py-2 px-3 mb-3 text-sm rounded-2xl ml-[9rem] bg-green-300/20 max-w-56">
            <div>
              <p>Hi Josh i want enquire about the house you posted on Nest</p>
            </div>

            <div className="flex justify-between pt-1">
              <div>
                <p className="text-xs italic text-muted-foreground">
                  2 min ago
                </p>
              </div>

              <div></div>
            </div>
          </div>
        </div>

        <div className="px-3 max-h-52 border border-slate-300 focus-within:outline focus-within:outline-blue-500  rounded-3xl mx-3 mb-3">
          <div className="flex gap-2 justify-between items-center w-full h-full">
            <textarea
            value={input}
            name="input"
            onChange={(e) => setInput(e.target.value)}
            className="w-full text-sm hide-scroll py-1 resize-none max-h-32 focus:border-none focus:outline-none  bg-transparent"></textarea>

            <Button onClick={sendMessage} className="bg-transparent p-2 aspect-square text-center hover:bg-blue-300/20 text-brand-primary rounded-full">
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
