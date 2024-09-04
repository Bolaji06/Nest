import NavBar2 from "@/components/NavBar2";
import ProfileSideBar from "@/components/ProfileSideBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CirclePlus } from "lucide-react";
import ActivityComponent from "@/components/ActivityComponent";

export default  function Layout({ children }: { children: React.ReactNode }) {
  
  return (
    <>
      <main className="">
        <NavBar2 />

        <div className="px-3">
          <div className="flex md:flex-row gap-3 lg:gap-2 flex-col">
            <div className="lg:basis-[40%] w-full md:w-[70%] md:block mt-24">
              <ProfileSideBar />
            </div>
            <div className="relative basis-full md:top-24 px-6 py-6 border rounded-3xl mb-20">
              <header className="">
                <ActivityComponent />
              </header>
              {children}
            </div>
          </div>
        </div>
        <div className="fixed z-40 bottom-6 right-8">
          <Button
            asChild
            data-ripple-light="true"
            data-tooltip-target="tooltip"
            type="button"
            className="h-14 w-14 flex flex-col justify-center items-center gap-2 hover:bg-orange-400 bg-brand-secondary rounded-full"
          >
            <Link href={"/form-post"}>
              <CirclePlus />
              <p className="text-xs lg:hidden">Post</p>
            </Link>
          </Button>
        </div>
      </main>
    </>
  );
}
