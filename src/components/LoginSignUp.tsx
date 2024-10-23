"use client";

import Image from "next/image";
import logo from "../../public/nest-logo.png";
import { CircleAlert, Eye, EyeOff, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { useFormState } from "react-dom";
import { registerAction } from "@/actions/authActions";
import { FormButton } from "./FormButton";


interface ILoginSignUpProps {
  setOpenAuthOutlet: (curState: boolean) => void;
  setShowForgotPortal: (curState: boolean) => void;
  setShowLoginSignUp: (curState: boolean) => void;
  loginState: any,
  loginAction: (payload: FormData) => void
}
export default function LoginSignUp({
  setOpenAuthOutlet,
  setShowLoginSignUp,
  setShowForgotPortal,
  loginState,
  loginAction
  
}: ILoginSignUpProps) {
  const [tab, setTab] = useState<string>("sign-in");
  const [togglePassword, setTogglePassword] = useState<boolean>(false);

  const [registerState, signUpAction] = useFormState(registerAction, {});

  function handlePasswordToggle() {
    setTogglePassword(!togglePassword);
  }

  function signInTab() {
    setTab("sign-in");
  }

  function signUpTab() {
    setTab("sign-up");
  }

  function closeSignPortal() {
    setOpenAuthOutlet(false);
  }

  function handleForgot() {
    setShowForgotPortal(true);
    setShowLoginSignUp(false)
  }

  useEffect(() => {
    if (loginState?.success) {
      setOpenAuthOutlet(false);
      window.location.reload()
    }
  }, [loginState]);

  return (
    <>
      <main className="h-screen w-screen overflow-hidden">
        <div
          className="absolute z-40 overflow-hidden inset-0 bg-black/65"
          onClick={closeSignPortal}
        />
        <div className="w-full sm:w-[350px] rounded-md absolute top-6 lg:top-10 z-50 left-1/2 -translate-x-1/2 bg-white overflow-hidden">
          <div className="p-3">
            <header className="flex justify-between items-center">
              <Image src={logo} alt="Nest logo" width={80} />

              <div
                className="cursor-pointer hover:bg-slate-200 p-2 rounded-full"
                onClick={closeSignPortal}
              >
                <X />
              </div>
            </header>

            <div className="mt-4 flex items-center gap-8 border-b border-slate-300">
              <div className="px-3 cursor-pointer" onClick={signInTab}>
                <header className="py-1 mt-1">
                  <h3>Sign in</h3>
                </header>
                {tab === "sign-in" && (
                  <div className="border-t-4 rounded-tr-2xl rounded-tl-2xl border-brand-primary px-5" />
                )}
              </div>

              <div className="px-3 cursor-pointer" onClick={signUpTab}>
                <header className="py-1 mt-1">
                  <h3>New Account</h3>
                </header>
                {tab === "sign-up" && (
                  <div className="border-t-4 rounded-tr-2xl rounded-tl-2xl border-brand-primary px-5" />
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-8 px-6">
            {tab === "sign-in" && (
              <section className="w-full">
                <form action={loginAction} noValidate className="space-y-3">
                  <div className="">
                    <label htmlFor="email" className="text-sm">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      autoFocus
                      className={`w-full border-slate-400/45`}
                    />
                    {loginState?.field === "email" && (
                      <p className="py-1 text-xs first-letter:uppercase text-red-500">
                        {loginState?.status}
                      </p>
                    )}
                  </div>
                  <div className="">
                    <label htmlFor="password" className="text-sm">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={togglePassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className={`w-full border-slate-400/45 pr-10 `}
                      />
                      {loginState?.field === "password" && (
                        <p className="py-1 text-xs first-letter:uppercase text-red-500">
                          {loginState?.status}
                        </p>
                      )}
                      <div
                        className="absolute top-1 right-1 p-2 cursor-pointer"
                        onClick={handlePasswordToggle}
                      >
                        {togglePassword ? (
                          <Eye size={18} />
                        ) : (
                          <EyeOff size={18} />
                        )}
                      </div>
                    </div>
                  </div>
                  <FormButton text="Sign In" />
                </form>
                {!loginState?.success && (
                  <div className="py-2 text-sm text-red-500 flex items-center gap-1">
                    {loginState?.message && (
                      <CircleAlert size={16} color="red" />
                    )}{" "}
                    <p className="first-letter:uppercase">
                      {loginState?.message}
                    </p>
                  </div>
                )}
                <Button
                  className="flex w-full underline my-2 items-center justify-center text-sm font-medium 
                text-brand-primary bg-transparent hover:bg-transparent text-center"
                  onClick={handleForgot}
                >
                  Forgot Password?
                </Button>
              </section>
            )}

            {/* Register */}

            {tab === "sign-up" && (
              <section className="w-full">
                <form action={signUpAction} className="space-y-3">
                  <div className="">
                    <label htmlFor="email" className="text-sm">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      autoFocus
                      className="w-full border-slate-400/45"
                    />
                    {registerState?.field === "email" && (
                      <p className="py-1 text-xs first-letter:uppercase text-red-500">
                        {registerState?.status}
                      </p>
                    )}
                  </div>
                  <div className="">
                    <label htmlFor="username" className="text-sm">
                      Username
                    </label>
                    <Input
                      id="username"
                      name="username"
                      placeholder="Enter a username"
                      className="w-full border-slate-400/45"
                    />
                    {registerState?.field === "username" && (
                      <p className="py-1 text-xs first-letter:uppercase text-red-500">
                        {registerState?.status}
                      </p>
                    )}
                  </div>
                  <div className="">
                    <label htmlFor="password" className="text-sm">
                      Password
                    </label>
                    <Input
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      className="w-full border-slate-400/45"
                    />
                    {registerState?.field === "password" && (
                      <p className="py-1 text-xs first-letter:uppercase text-red-500">
                        {registerState?.status}
                      </p>
                    )}
                  </div>
                  <FormButton text="Sign Up" />
                </form>

                {!registerState.success && (
                  <div className="py-2 text-sm text-red-500 flex items-center gap-1">
                    {registerState.message && (
                      <CircleAlert size={16} color="red" />
                    )}{" "}
                    <p className="first-letter:uppercase">
                      {registerState.message}
                    </p>
                  </div>
                )}

                <p className="text-xs py-2 mb-2 text-slate-500">
                  I accepts Nest{" "}
                  <Link
                    href={"/terms"}
                    className="underline text-brand-primary"
                  >
                    Terms of use{" "}
                  </Link>
                  and{" "}
                  <Link
                    href={"/privacy"}
                    className="underline text-brand-primary"
                  >
                    {" "}
                    Privacy Policy
                  </Link>
                </p>
              </section>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
