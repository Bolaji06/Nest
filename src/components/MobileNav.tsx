"use client";

import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/utils/links";
import { X } from "lucide-react";
import footerArt from "../../../public/footer-art.svg";

export default function MobileNav() {
  return (
    <>
        <nav className="fixed z-50 w-72 h-screen right-0 top-0 bg-brand-text py-2">
        <div className="p-3 w-full flex justify-end">
          <X color="white" size={45} className="cursor-pointer p-2" />
        </div>
        <div className="px-4 py-6 flex flex-col gap-4">
          {navLinks.map((link) => {
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-brand-text_light tex-lg px-3 rounded-lg font-medium py-2 hover:bg-slate-500/45"
              >
                { link.link }
              </Link>
            );
          })}
        </div>

        <footer className="fixed bottom-0">
          <Image src={footerArt} alt="footer art" />
        </footer>
      </nav>
    </>
  );
}
