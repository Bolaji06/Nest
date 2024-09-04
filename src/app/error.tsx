"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({ error, reset }: {
    error: Error & { digest?: string },
    reset: () => void
}){
    useEffect(() => {
        console.error(error)
    }, [error]);

    return (
        <>
            <main>
                <h1>This is the Error Page</h1>
                <Button onClick={() => reset()}>
                    Try again!
                </Button>
            </main>
        </>
    )
}