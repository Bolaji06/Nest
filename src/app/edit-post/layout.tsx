import { ReactNode } from "react";

export default function EditPostLayout({ children }: { children: ReactNode }){


    return (
        <>
            <main className="p-6 flex justify-center items-center">
                { children }
            </main>
        </>
    )
}