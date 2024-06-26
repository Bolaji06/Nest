"use client";

import Link from "next/link";
import { FormButton } from "@/components/FormButton";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AlertCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { forgotPasswordAction } from "@/actions/authActions";

interface IForgotProps {
  setShowLoginSignUp: (curState: boolean) => void;
  setShowForgotPortal: (curState: boolean) => void;
  setOpenAuthOutlet: (curState: boolean) => void;
  setEmailNotification: (curState: boolean) => void;
}
export default function ForgotPassword({
  setShowLoginSignUp,
  setShowForgotPortal,
  setOpenAuthOutlet,
  setEmailNotification,
}: IForgotProps) {
  const [forgotState, forgotAction] = useFormState(forgotPasswordAction, {});

  function closeForgot() {
    setShowForgotPortal(false);
    setOpenAuthOutlet(false);
  }

  function handleOpenSignIn() {
    setShowLoginSignUp(true);
    setShowForgotPortal(false);
  }

  useEffect(() => {
    if (forgotState.success) {
      setShowForgotPortal(false);
      setEmailNotification(true);
    }
  }, [forgotState]);

  console.log(forgotState);

  return (
    <>
      <section className="overflow-hidden ">
        <div
          className="absolute z-40 inset-0 bg-black/65"
          onClick={closeForgot}
        />

        <main className="w-full sm:w-[400px] rounded-md bg-white z-50 py-3 px-6 absolute left-1/2 top-6 lg:top-10 -translate-x-1/2">
          <div>
            <div className="flex justify-end ">
              <div
                className="hover:bg-slate-200 cursor-pointer p-3 hover:rounded-full"
                onClick={closeForgot}
              >
                <X size={22} />
              </div>
            </div>
            <header className="text-center">
              <h1 className="py-2 text-bg-brand-text text-3xl font-extrabold">
                Forgot your password
              </h1>
              <p className="py-2">
                Enter your email address and we will send you a link to set your
                password.
              </p>
            </header>
          </div>

          <div className="pb-10 mt-4">
            <form action={forgotAction} noValidate className="space-y-4">
              <div>
                <label htmlFor="email">Email</label>
                <Input
                  placeholder="Enter your email"
                  id="email"
                  name="email"
                  autoFocus
                  className="w-full"
                />
                {forgotState?.field && (
                  <p className="first-letter:uppercase py-1 text-xs text-red-500">
                    {forgotState?.status}
                  </p>
                )}
              </div>

              <FormButton text="Send" />
            </form>
            {!forgotState?.success && (
              <div className="flex items-center gap-2 py-1">
                {forgotState?.message && <AlertCircle size={16} color="red" />}
                <p className="text-sm text-red-500 first-letter:uppercase">
                  {forgotState?.message}
                </p>
              </div>
            )}
            <div className="flex items-center justify-center gap-2">
              <p>Know your password?</p>
              <Button
                className="bg-transparent p-0 text-brand-primary hover:underline
                             hover:bg-transparent text-base font-bold"
                onClick={handleOpenSignIn}
              >
                Sign in
              </Button>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}
