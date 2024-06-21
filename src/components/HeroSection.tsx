"use client";

import Image from "next/image";
import heroImage from "../../public/hero.jpg";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChangeEvent, FormEvent, Suspense, useState } from "react";
import { SearchIcon } from "lucide-react";
import ForgotPassword from "@/components/ForgotPassword";
import { useSearchParams } from "next/navigation";
import ResetPassword from "./ResetPassword";
import { createPortal } from "react-dom";
export default function HeroSection() {
  const [searchInput, setSearchInput] = useState("");
  const resetToken = useSearchParams().get("reset");

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }

  return (
    <>
      <main className="py-4 rounded-lg relative top-4 h-[440px]">
        {/* <ForgotPassword /> */}
        <Image
          src={heroImage}
          alt="hero image of new home owners of family of three standing with home agent"
          className="rounded-lg max-h-full bg-cover bg-center overflow-hidden object-cover"
          fill={true}
        />
        <div className="absolute z-10 bg-black/40 inset-0 rounded-lg" />

        <div className="w-full px-3 sm:w-[500px] top-20 left-1/2 -translate-x-1/2 relative z-20">
          <div>
            <h1 className=" text-4xl md:text-5xl font-bold text-center md:leading-[3.5rem] text-white">
              Move to your new home with ease
            </h1>
          </div>

          <div className="mt-4 relative">
            <Input
              className="py-8 pr-16 text-lg rounded-md"
              onChange={onChange}
              placeholder="Search city, state, country"
              name="search"
              value={searchInput}
            />
            <Button className="absolute right-0 top-0 h-full bg-transparent hover:bg-blue-500/15 rounded-l-none rounded-r-md">
              <SearchIcon color="blue" />
            </Button>
          </div>
        </div>
      </main>

      {resetToken && (
        <div className="overflow-hidden">
          <ResetPassword token={resetToken} />
        </div>
      )}
    </>
  );
}
