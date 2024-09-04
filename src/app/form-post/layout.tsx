import NavBar from "@/components/ui/NavBar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>
        <header>
            <NavBar />
        </header>
        <section className="px-5 py-20">{children}</section>
      </main>
    </>
  );
}
