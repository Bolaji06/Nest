
import { Button } from "./ui/button";
import clsx from "clsx";
import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";

export function FormButton({ text }: { text: string }) {
    const { pending } = useFormStatus();
  
    return (
      <>
        <Button
          disabled={pending}
          aria-disabled={pending}
          className={`font-medium ${clsx({
            "bg-slate-500 cursor-not-allowed": pending,
          })} bg-brand-primary w-full
           text-white hover:bg-blue-700 flex justify-center items-center gap-3`}
        >
          {pending && (
            <LoaderCircle size={16} color="white" className="animate-spin" />
          )}
          {text}
        </Button>
      </>
    );
  }