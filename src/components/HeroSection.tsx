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
import SearchBox from "./ui/SearchBox";
import dynamic from "next/dynamic";

const DynamicSearchBar = dynamic(() => import("./ui/SearchBox"), {
  ssr: false,
});
export default function HeroSection() {
 
  const resetToken = useSearchParams().get("reset");

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
          <DynamicSearchBar
            searchFilter={false}
            placeholder="Search title"
            className="pr-12 py-8 text-lg"/>
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
