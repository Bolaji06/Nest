import Image from "next/image";
import logo from "../../../public/nest-logo.png";
import Link from "next/link";
import { navLinks } from "@/utils/links";
import { Button } from "./button";

export default function NavBar() {
  return (
    <>
      <nav className="bg-white fixed w-full py-3 px-6 shadow-lg">
        <div className="">
          <div className="flex justify-between items-center">
            <Image src={logo} alt="nest logo" width={100} height={100} />
            <div className="flex justify-between items-center">
              {navLinks.map((link) => {
                return (
                  <Link className="py-2 space-x-2 text-brand-text px-4 hover:font-medium text-base hover:bg-blue-700/10 rounded-lg" key={link.href} href={link.href}>
                    {link.link}
                  </Link>
                );
              })}

              <div className="ml-10">
                <Button className="bg-brand-primary font-medium hover:opacity-80 hover:bg-brand-primary">
                  Sign in
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
