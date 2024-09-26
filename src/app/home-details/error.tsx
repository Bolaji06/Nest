"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect } from "react";
import logo from "../../../public/nest-logo.png";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <main className="">
        <div className="absolute left-1/2 top-1/4 -translate-x-1/2 space-y-4 text-center w-full">
          <div className="w-full">
            <div className="w-full flex justify-center items-center pb-5">
              <Image
                src={logo}
                width={100}
                height={100}
                alt="Nest logo"
              />
            </div>
            <h2 className="text-2xl font-semibold">Home Details Not Found</h2>
          </div>
          <Button onClick={() => reset()} className="">
            Try again!
          </Button>
          <p className="text-sm">You can check your network connection</p>
        </div>
      </main>
    </>
  );
}
