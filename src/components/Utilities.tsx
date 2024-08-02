"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ISessionData, TPostResult } from "@/lib/definitions";
import { Heart } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useFormState } from "react-dom";
import { editSave } from "../actions/postActions";
import { editPost } from "@/lib/post";

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
export function SavedButton({ id, isSaved, session, token }: SavedButtonProps) {
  const [savePost, setSavePost] = useState<boolean>(false);
  const [state, action] = useFormState(editSave, {});
  const { toast } = useToast();

  function handleClick() {
    if (!session) {
      toast({
        title: "Can't save Post!",
        description: "You need to login",
      });
      return;
    }
    setSavePost((prevState) => !prevState);

    const handleSubmit = async () => {
      try {
        if (!token) {
          return;
        }
        const res = await editPost(id, token);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };

    handleSubmit();
  }

  function handleSaveChange(e: ChangeEvent<HTMLInputElement>) {
    setSavePost(e.target.checked);
  }

  // const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   if (!session) {
  //     toast({
  //       title: "Can't save Post!",
  //       description: "You need to login",
  //     });
  //     return;
  //   }
  //   setSavePost((prev) => !prev);
  // };

  //console.log(token)

  // async function handleSubmit(e: FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   if (!token) {
  //     return;
  //   }
  //   console.log(token);
  //   try {
  //     const response = await editPost(id,  token);
  //     console.log(response);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <>
      <div className="mt-2">
        {/* <form onSubmit={handleSubmit}>
          <label htmlFor="save">
            <input
              name="savePost"
              onChange={handleSaveChange}
              id="save"
              type="checkbox"
              checked={savePost}
              className="invisible"
            /> */}
        <Button
          onClick={handleClick}
          className="flex items-center gap-3 bg-slate-50 shadow-lg hover:bg-transparent text-base text-slate-600"
        >
          <Heart
            size={28}
            fill={isSaved ? "orange" : "transparent"}
            stroke="orange"
          />
          {isSaved ? "Saved" : "Save"}
        </Button>
        {/* </label>
        </form> */}
      </div>
    </>
  );
}
