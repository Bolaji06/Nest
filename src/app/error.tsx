"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";


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
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 space-y-4 text-center w-full">
          <div className="w-full">
            <h2 className="text-2xl font-semibold">Something went wrong!</h2>
          </div>
          <Button onClick={() => reset()} className="">Try again!</Button>
          <p className="text-sm">You can check your network connection</p>
        </div>
      </main>
    </>
  );
}
