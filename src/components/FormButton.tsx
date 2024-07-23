
import { Button } from "./ui/button";
import clsx from "clsx";
import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";

export function FormButton({ text, className, isDisabled }: { text: string, className?: string, isDisabled?: boolean }) {
    const { pending } = useFormStatus();
  
    return (
      <>
        <Button
          disabled={pending || isDisabled}
          aria-disabled={pending}
          className={`font-medium ${clsx({
            "bg-slate-500 cursor-not-allowed": pending,
            "bg-slate-200 cursor-not-allowed": isDisabled,
          })} bg-brand-primary w-full
           text-white hover:bg-blue-700 flex justify-center items-center gap-3 ${className}`}
        >
          {pending && (
            <LoaderCircle size={16} color="white" className="animate-spin" />
          )}
          {text}
        </Button>
      </>
    );
  }