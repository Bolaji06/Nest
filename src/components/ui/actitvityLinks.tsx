'use client';
import { profileSideLink } from "@/utils/links";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActivityLinks() {
    const pathname = usePathname();

  return (
    <>
      <nav className="mt-5 py-3 w-full h-20">
        <ul className="flex gap-3 w-full items-center overflow-x-auto h-full scroll-smooth no-scrollbar">
          {profileSideLink.map((link) => {
            return (
              <li
                key={link.link}
                className="shrink-0"
              >
                <Link href={link.link} className={`${clsx({'bg-green-900 text-white hover:bg-green-900': pathname === link.link})} px-6 py-3 text-sm font-normal rounded-3xl hover:bg-green-100 text-slate-500 `}>{link.name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
