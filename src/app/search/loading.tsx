import { Loader2 } from "lucide-react";

export default function Loading() {
    
  return (
    <>
      <main className="relative h-screen">
        <div className="absolute inset-0 bg-slate-50" />

        <div className="flex justify-center items-center align-middle h-screen w-screen">
          <Loader2 size={60} className="animate-spin text-slate-950" />
        </div>
      </main>
    </>
  );
}
