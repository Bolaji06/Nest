import NavBar from "@/components/ui/NavBar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <main>
        <div className="border">
          <NavBar />  
        </div>
        
        <section className="pt-20">{children}</section>
      </main>
    </>
  );
}
