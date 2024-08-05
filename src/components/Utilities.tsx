"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useOptimistic,
  useState,
} from "react";
import { Button } from "./ui/button";
import { ISessionData, TPostResult } from "@/lib/definitions";
import { Heart } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useFormState } from "react-dom";
import { addSavePost, removeSavedPost } from "@/lib/post";
import { boolean } from "zod";

export function Modal() {
  const [closeModal, setCloseModal] = useState<boolean>(true);

  function handleModalClose() {
    setCloseModal(false);
  }

  return (
    <>
      {closeModal && (
        <section className="absolute z-10 top-52 left-1/2 -translate-x-1/2 flex justify-center items-center">
          <div className="">
            <div className="inset-0 bg-black/45" />

            <div
              className="z-20 flex flex-col space-y-3 justify-center items-center  align-middle
                    bg-white shadow-lg py-10 px-6 rounded-md"
            >
              <h2>You need to login or sign up</h2>
              <Button onClick={handleModalClose}>Ok</Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

interface SavedButtonProps {
  id: string;
  isSaved: boolean;
  session: ISessionData | null;
  token: string | undefined;
}

interface SavePostStatus {
  success: boolean;
  message: string;
}
export function SavedButton({ id, isSaved, session, token }: SavedButtonProps) {
  const { toast } = useToast();

  // optimistically updating the saved post
  const [optimisticState, addOptimistic] = useOptimistic<boolean, boolean>(
    isSaved,
    (_, optimisticValue) => optimisticValue
  );

  function handleClick() {
    if (!session) {
      toast({
        title: "Can't save Post!",
        description: "You need to login",
      });
      return;
    }

    const newSavedState = !optimisticState;
    addOptimistic(newSavedState);

    const handleSubmit = async () => {
      try {
        if (!token) {
          return;
        }
        if (newSavedState) {
          const bindAction = addSavePost.bind(null, id, token);
          await bindAction();
        } else {
          const removeAction = removeSavedPost.bind(null, id, token);
          await removeAction();
        }
      } catch (err) {
        addOptimistic(!optimisticState);
        toast({
          title: "Failed to save",
          description: "Failed to save post. Try again.",
        });
      }
    };

    handleSubmit();
  }

  return (
    <>
      <div className="mt-2">
        <Button
          onClick={handleClick}
          className="flex items-center gap-3 bg-slate-50 shadow-lg hover:bg-transparent text-base text-slate-600"
        >
          <Heart
            size={28}
            fill={optimisticState ? "orange" : "transparent"}
            stroke="orange"
          />
          {optimisticState ? "Saved" : "Save"}
        </Button>
      </div>
    </>
  );
}
