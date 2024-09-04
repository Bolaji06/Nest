"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOff } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { FormButton } from "./FormButton";
import { IUserProfileData } from "@/lib/definitions";
import { createPortal, useFormState } from "react-dom";
import { updateUser } from "@/actions/userActions";
import { useToast } from "./ui/use-toast";
import { userType } from "@/utils/links";
import Link from "next/link";

interface IEditInput {
  username: string;
  email: string;
  password: string;
  userType: string;
}
export default function ProfileComponent({ data }: IUserProfileData) {
  const [updateState, updateAction] = useFormState(updateUser, {});
  const [toggleEdit, setToggleEdit] = useState(false);
  const { toast } = useToast();

  const [editInput, setEditInput] = useState({
    username: "",
    email: "",
    password: "",
    userType: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setEditInput((curState: IEditInput) => {
      return {
        ...curState,
        [name]: value,
      };
    });
  }

  const isInputFilled =
    !editInput.email &&
    !editInput.password &&
    !editInput.username &&
    !editInput.userType;

  function editProfile() {
    setToggleEdit(true);
  }
  function cancelEdit() {
    setToggleEdit(false);
  }

  useEffect(() => {
    if (updateState?.success) {
      toast({
        description: updateState?.message,
      });
    }
    // else{
    //   toast({
    //     variant: "destructive",
    //     description: updateState?.message
    //   })
    // }
  }, [updateState]);


  return (
    <>
      <main className="px-8 lg:px-0">
        <header>
          <div className="flex items-center gap-5">
            <h1 className="text-2xl font-semibold text-gray-700">
              {toggleEdit ? "Edit" : "User"} Profile
            </h1>
            <Button
              className="text-lg bg-transparent hover:bg-transparent text-brand-secondary hover:underline"
              onClick={editProfile}
            >
              Edit
            </Button>
          </div>
        </header>

        {!toggleEdit ? (
          <section className="py-4">
            <div className="space-y-5">
              <div>
                <h2 className="font-semibold">Username</h2>
                <p>{data?.username}</p>
              </div>
              <div>
                <h2 className="font-semibold">Email</h2>
                <p>{data?.email}</p>
              </div>
              {/* <div>
                <h2 className="font-semibold">Password</h2>
                <div className="flex items-center gap-5 w-52">
                  <input
                    defaultValue={togglePassword ? data.password : data?.password.repeat(5)}
                    readOnly
                    className="border-none focus:border-none border-transparent outline-none focus:outline-none"
                  />
                  <Button
                    onClick={handleTogglePassword}
                    className="bg-transparent hover:bg-transparent"
                  >
                    {!togglePassword ? (
                      <EyeIcon className="text-black" />
                    ) : (
                      <EyeOff className="text-black" />
                    )}
                  </Button>
                </div>
              </div>
            </div> */}
            </div>
          </section>
        ) : (
          <section className="py-4">
            <div className="pr-5">
              <form action={updateAction} className="space-y-4">
                <div>
                  <label htmlFor="username">Username</label>
                  <Input
                    id="username"
                    placeholder="New username"
                    name="username"
                    value={editInput.username}
                    onChange={handleChange}
                  />

                  {updateState?.path?.[0] === "username" && (
                    <p className="text-sm py-2 text-red-500 first-letter:uppercase">
                      {updateState?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="username">Email</label>
                  <Input
                    id="email"
                    placeholder="New Email"
                    name="email"
                    value={editInput.email}
                    onChange={handleChange}
                  />
                  {updateState?.path?.[0] === "email" && (
                    <p className="text-sm py-2 text-red-500 first-letter:uppercase">
                      {updateState?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="username">Password</label>
                  <Input
                    id="password"
                    placeholder="New password"
                    name="password"
                    value={editInput.password}
                    onChange={handleChange}
                  />
                  {updateState?.path?.[0] === "password" && (
                    <p className="text-sm py-2 text-red-500 first-letter:uppercase">
                      {updateState?.message}
                    </p>
                  )}
                </div>
                <input
                  type="text"
                  name="userId"
                  value={data?.id}
                  readOnly
                  hidden
                  aria-hidden
                />
                <div className="mt-4">
                  <select onChange={handleChange} value={editInput.userType} className="p-2 border text-sm rounded-md" name="userType">
                    <option value="" selected disabled>
                      Select Type
                    </option>
                    {userType.map((type) => {
                      return (
                        <option
                          key={type.value}
                          value={type.value}
                          className="m-4"
                        >
                          {type.text}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex items-center gap-4">
                  <FormButton
                    text="Submit"
                    className="w-28"
                    isDisabled={isInputFilled}
                  />
                  <Button
                    className="bg-transparent border text-brand-secondary hover:text-brand-text_light
                   border-brand-secondary hover:bg-brand-secondary"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </section>
        )}

        
      </main>
      
    </>
  );
}
