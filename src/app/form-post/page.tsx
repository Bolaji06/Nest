import FormPostClient from "@/components/FormPostClient";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Add new post form | Nest.com"
}
export default async function FormPost() {
  const userCookie = cookies().get("token")?.value;

  return (
    <>
      <FormPostClient cookieData={userCookie} />
    </>
  );
}
