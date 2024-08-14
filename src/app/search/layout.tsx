import NavBar from "@/components/ui/NavBar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="overflow-y-hidden">
        <section className="overflow-y-hidden">{children}</section>
      </main>
    </>
  );
}
