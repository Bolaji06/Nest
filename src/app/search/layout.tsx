import NavBar from "@/components/ui/NavBar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="">
        <section className="">{children}</section>
      </main>
    </>
  );
}
