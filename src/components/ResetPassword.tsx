"use client";

import { Button } from "./ui/button";
import { FormButton } from "./FormButton";
import { X, AlertCircle } from "lucide-react";
import { Input } from "./ui/input";
import { useFormState } from "react-dom";
import { resetPasswordAction } from "@/actions/authActions";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NotificationBox from "./NotificationBox";

interface IResetPassword {
  token: string | null,
  closeResetPassword?: (curState: string) => void
}
export default function ResetPassword({ token, closeResetPassword}: IResetPassword) {

  const [actionState, action] = useFormState(resetPasswordAction, {});
 
  const router = useRouter();
  
  function handleCloseResetPassword(){
    router.push('/');
  }

  console.log(actionState)

  return (
    <>
      { <section>
        <div className="absolute z-50 inset-0 bg-black/65" />

        <main className="w-full sm:w-[400px] rounded-md bg-white z-50 py-3 px-6 absolute left-1/2 top-6 lg:top-10 -translate-x-1/2">
          <div>
            <div className="flex justify-end ">
              <div className="hover:bg-slate-200 cursor-pointer p-3 hover:rounded-full">
                <X size={22} onClick={handleCloseResetPassword}/>
              </div>
            </div>
            <header className="text-center">
              <h1 className="py-2 text-bg-brand-text text-3xl font-extrabold">
                Reset your password
              </h1>
            </header>
          </div>

          <div className="pb-10 mt-4">
            <form action={action} noValidate className="space-y-4">
              <div>
                <label htmlFor="email" className="text-sm">
                  New Password
                </label>
                <Input
                  placeholder="Enter new password"
                  id="password"
                  name="password"
                  autoFocus
                  className="w-full"
                />
                {actionState?.field === "password" && (
                  <p className="first-letter:uppercase py-1 text-xs text-red-500">
                    {actionState?.status}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="text-sm">
                  Confirm Password
                </label>
                <Input
                  placeholder="Confirm password"
                  id="confirm"
                  name="confirm"
                  className="w-full"
                />
                {actionState?.field === "confirm" && (
                  <p className="first-letter:uppercase py-1 text-xs text-red-500">
                    {actionState?.status}
                  </p>
                )}
              </div>

              <div>
                
                <Input
                  name="token"
                  type="hidden"
                  defaultValue={token ? token : ""}
                  aria-hidden
                />
              </div>

              <FormButton text="Reset" />
            </form>
            {!actionState?.success && (
              <div className="flex items-center gap-2 py-1">
                {actionState?.message && <AlertCircle size={16} color="red" />}
                <p className="text-sm text-red-500 first-letter:uppercase">
                  {actionState?.message}
                </p>
              </div>
            )}
          </div>
        </main>
      </section>}
    </>
  );
}
