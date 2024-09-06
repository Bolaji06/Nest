"use client";

import { IUserProfile } from "@/lib/definitions";
import { Input } from "./ui/input";
import { userType } from "@/utils/links";
import { FormButton } from "./FormButton";
import { Button } from "./ui/button";
import { useFormState } from "react-dom";
import { updateUser } from "@/actions/userActions";
import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";

interface UpdateUserFormProps {
  user: IUserProfile;
}
const initialState = {
  message: "",
};
export default function UpdateUserForm({ user }: UpdateUserFormProps) {
  const [state, updateAction] = useFormState(updateUser, {});

  const { toast } = useToast();

  useEffect(() => {
    if (state?.success) {
      toast({
        title: "Success!",
        description: "Profile updated successfully",
      });
    }
  },[state?.success, updateAction]);

  //setReset({});

  console.log(state);


  return (
    <>
      <section className="mt-4 py-3">
        <form action={updateAction} className="space-y-3">
          <input type="text" defaultValue={user.id} name="userId" hidden aria-hidden />
          <div>
            <label htmlFor="firstName" className="text-sm mb-3 text-slate-400">
              First name
            </label>
            <Input
              id="firstName"
              name="firstName"
              defaultValue={user.firstName}
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="text-sm mb-3 text-slate-400">
              Last name
            </label>
            <Input
              id="lastName"
              name="lastName"
              defaultValue={user.lastName}
              placeholder="Enter your last name"
            />
          </div>
          <div>
            <label htmlFor="username" className="text-sm mb-3 text-slate-400">
              Username
            </label>
            <Input
              id="username"
              name="username"
              defaultValue={user.username}
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label htmlFor="userType" className="text-sm mb-3 text-slate-400">
              User type
            </label>
            <select
              defaultValue={user.userType}
              name="userType"
              className="w-full border capitalize focus-visible:outline-none focus-visible:ring-2 ring-offset-blue-500 text-sm focus-visible:ring-offset-2 rounded-md py-2 px-2"
            >
              {userType.map((type) => {
                return (
                  <option key={type.value} value={type.value}>
                    {type.text}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="text-sm mb-3 text-slate-400"
            >
              Phone number
            </label>
            <Input
              id="phoneNumber"
              name="phone"
              defaultValue={user.phone}
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label htmlFor="location" className="text-sm mb-3 text-slate-400">
              Location
            </label>
            <Input
              id="location"
              name="location"
              defaultValue={user.location}
              placeholder="Enter your location"
            />
          </div>
          <div>
            <label htmlFor="about" className="text-sm mb-3 text-slate-400">
              About
            </label>
            <textarea
              id="about"
              name="about"
              defaultValue={user.about}
              placeholder="About you..."
              className="w-full border capitalize focus-visible:outline-none focus-visible:ring-2 ring-offset-blue-500 text-sm focus-visible:ring-offset-2 rounded-md py-2 px-3"
            />
          </div>
          <div className="flex gap-4">
            <FormButton text="Update" className="" />

            <Button className="bg-red-500">Cancel</Button>
          </div>
        </form>
      </section>
    </>
  );
}
