"use client";

import Image from "next/image";
import logo from "../../public/nest-logo.png";
import footerArt from "../../public/footer-art.svg";
import { navLinks, profileSideLink } from "@/utils/links";
import Link from "next/link";
import { ChevronDown, ChevronUp, MenuIcon, UserCircle } from "lucide-react";
import { useState } from "react";
import { X } from "lucide-react";
import SearchBox from "./ui/SearchBox";
import { Button } from "./ui/button";
export default function NavBar2() {
  const [toggleMobileNav, setToggleMobileNav] = useState(false);
  const [toggleProfileDetails, setToggleProfileDetails] = useState(false);

  function closeMobileNav() {
    setToggleMobileNav(false);
  }

  function openMobileNav() {
    setToggleMobileNav(true);
  }
  function handleProfileToggle() {
    setToggleProfileDetails((curState) => {
      return !curState;
    });
  }

  return (
    <>
      <nav className="bg-white w-full py-4 px-6 z-40 border-b border-slate-300 fixed">
        <div className="">
          <div className="flex justify-between items-center">
            <Image src={logo} alt="nest logo" width={100} height={100} />

            <div className="relative w-full lg:w-[60%]">
              <SearchBox
              placeholder="Enter property title, type, city etc"
              searchFilter={false} 
              className="py-4 pr-16 w-full" />
            </div>

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

              <div className="ml-2 flex gap-6 items-center">
                <div className="block lg:hidden" onClick={openMobileNav}>
                  <MenuIcon color="black" className="cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
          {toggleMobileNav && (
            <nav className="fixed w-72 overflow-auto h-screen pb-10 right-0 top-0 bg-brand-text py-2">
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
              <div className="block md:hidden px-4">
                <div className="">
                  <header className="flex gap-3 text-brand-text_light items-center">
                    <UserCircle />
                    <p className="text-xl font-medium">Bolaji Bolajoko</p>
                    <Button
                      className="bg-transparent hover:bg-transparent cursor-pointer"
                      onClick={handleProfileToggle}
                    >
                      {!toggleProfileDetails ? <ChevronDown /> : <ChevronUp />}
                    </Button>
                  </header>

                  {toggleProfileDetails && (
                    <section className="text-brand-text_light">
                     <ul className="border-b border-slate-800 pb-3">
                      {
                        profileSideLink.map((link) => {
                          return <li key={link.name} className="py-3 hover:underline">
                            <Link href={link.link}
                            className="text-brand-text_light px-3 rounded-lg">
                              {link.name}
                            </Link>

                          </li>
                        })
                      }
                     </ul>
                    </section>
                  )}
                </div>
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
    </>
  );
}
