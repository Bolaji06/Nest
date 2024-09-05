import ActivityComponent from "@/components/ActivityComponent"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Saved Post | Nest.com"
}

export default function SavedSearch(){

    return(
        <>
            <main>
            <header className="">
                <ActivityComponent />
              </header>
                Saved Search
            </main>
        </>
    )
}