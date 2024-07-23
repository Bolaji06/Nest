import FormPostClient from "@/components/FormPostClient";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default async function FormPost() {
  const userCookie = cookies().get("token")?.value;

  return (
    <>
      <FormPostClient cookieData={userCookie} />
    </>
  );
}
