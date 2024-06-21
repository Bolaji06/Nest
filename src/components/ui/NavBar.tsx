"use client";
import Image from "next/image";
import logo from "../../../public/nest-logo.png";
import footerArt from "../../../public/footer-art.svg";
import Link from "next/link";
import { navLinks } from "@/utils/links";
import { Button } from "./button";
import { MenuIcon, X } from "lucide-react";
import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import { createPortal } from "react-dom";
import { useSearchParams } from "next/navigation";
import ResetPassword from "@/components/ResetPassword";

const DynamicAuthOutlet = dynamic(() => import("@/components/AuthOutlet"), {
  ssr: false,
});

const DynamicResetPassword = dynamic(
  () => import("@/components/ResetPassword"),
  { ssr: false }
);
export default function NavBar() {
  const [toggleMobileNav, setToggleMobileNav] = useState(false);
  const [openAuthOutlet, setOpenAuthOutlet] = useState<boolean>(false);

  function openMobileNav() {
    setToggleMobileNav(true);
  }

  function closeMobileNav() {
    setToggleMobileNav(false);
  }

  function handleSignInPortal() {
    setOpenAuthOutlet(true);
  }

  return (
    <>
      <nav className="bg-white fixed w-full py-3 px-6 z-40">
        <div className="">
          <div className="flex justify-between items-center">
            <Image src={logo} alt="nest logo" width={100} height={100} />
            <div className="flex justify-between items-center">
              <div className="hidden lg:block">
                {navLinks.map((link) => {
                  return (
                    <Link
                      className="py-2 space-x-2 text-brand-text px-4 hover:font-medium text-base hover:bg-blue-700/10 rounded-lg"
                      key={link.href}
                      href={link.href}
                    >
                      {link.link}
                    </Link>
                  );
                })}
              </div>

              <div className="ml-10 flex gap-6 items-center">
                <Button
                  className="bg-brand-primary font-medium hover:opacity-80 hover:bg-brand-primary"
                  onClick={handleSignInPortal}
                >
                  Sign in
                </Button>

                <div className="block lg:hidden" onClick={openMobileNav}>
                  <MenuIcon color="black" className="cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
          {toggleMobileNav && (
            <nav className="fixed w-72 h-screen right-0 top-0 bg-brand-text py-2">
              <div
                className="p-3 w-full flex justify-end"
                onClick={closeMobileNav}
              >
                <X
                  color="white"
                  size={45}
                  className="cursor-pointer p-2 hover:bg-slate-200/25 rounded-full"
                />
              </div>
              <div className="px-4 py-6 flex flex-col gap-4">
                {navLinks.map((link) => {
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-brand-text_light tex-lg px-3 rounded-lg font-medium py-2 hover:bg-slate-500/45"
                    >
                      {link.link}
                    </Link>
                  );
                })}
              </div>

              <footer className="fixed bottom-0">
                <Image src={footerArt} alt="footer art" />
              </footer>
            </nav>
          )}
        </div>
      </nav>

      {openAuthOutlet &&
        createPortal(
          <DynamicAuthOutlet setOpenAuthOutlet={setOpenAuthOutlet} />,
          document.body
        )}
    </>
  );
}
