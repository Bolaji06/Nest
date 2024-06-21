"use client";

import { MailCheck } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface ISetShowNotification  {
    setShowNotification: (curState: boolean) => void
    setOpenAuthOutlet: (curState: boolean) => void,
}
export default function NotificationBox({ setShowNotification, setOpenAuthOutlet }: ISetShowNotification){

    function handleCloseBox(){
        setShowNotification(false);
        setOpenAuthOutlet(false);
    }

    return (
        <>
            <section className="">
            <div className="absolute z-40 inset-0 bg-black/65"/>
                <div className="w-full sm:w-[400px] rounded-md bg-white z-50 py-3 px-6 
                absolute left-1/2 top-32 lg:top-32 -translate-x-1/2 space-y-3">
                    <div className="flex justify-center items-center">
                        <MailCheck size={40} className="text-green-600"/>
                    </div>

                    <div>
                        <h1 className="font-light text-center text-2xl">A reset email has been sent.</h1>
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={handleCloseBox}>OK</Button>
                    </div>

                </div>
            </section>
        </>
    )
}