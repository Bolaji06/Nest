import { ArrowRight, CircleUserRound, MoveRight } from "lucide-react";
import Image from "next/image";
import { Button } from "./button";
import Link from "next/link";
import { logOut } from "@/lib/getSession";
import { logOutAction } from "@/actions/authActions";

interface IProfileDropDown {
  id?: string | undefined
  username: string | undefined;
  email: string | undefined;
  imageUrl: string | undefined;
  logOut: () => void
}
export default function ProfileDropDown({
  username,
  email,
  imageUrl,
  logOut
}: IProfileDropDown) {
  
  return (
    <>
      <main className="absolute shadow-md rounded-md top-12 -right-3 bg-white w-64 p-3">
        <div className="flex items-center gap-3 py-2">
          <div>
            { imageUrl ?
            <Image
              src={imageUrl}
              width={100}
              height={100}
              alt={
                imageUrl ? `${username} profile image` : "profile avatar image"
              }
              className="rounded-full aspect-square w-10 object-cover"
            /> : <CircleUserRound size={30} className="text-gray-800"/>}
          </div>
          <h2 className="capitalize font-medium">{username}</h2>
        </div>

        <div className="py-2">
            <p className="text-sm sm:text-base">{email}</p>
        </div>

        <div className="bg-slate-200 w-full h-[2px]"/>

        <footer className="py-2">
            <div className="flex justify-between items-center">
                <Button asChild className="hover:bg-transparent text-brand-primary bg-transparent flex items-center gap-2">
                    <Link href={`/account`}
                    className="hover:underline text-lg">
                        Profile
                        <MoveRight />
                    </Link>
                    
                </Button>

                <Button className="bg-brand-secondary hover:bg-opacity-25 hover:bg-brand-secondary"
                onClick={logOut}>
                    Logout
                </Button>
            </div>
            
        </footer>
      </main>
    </>
  );
}
