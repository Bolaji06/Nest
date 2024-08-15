"use client";

import { Bath, Bed, Ruler } from "lucide-react";
import avatar from "../../../public/hero.jpg";
import Image from "next/image";
import { convertToCurrency } from "@/lib/utils";

import { motion } from "framer-motion"

interface IPostCardProps  {
    id?: string;
    image: string;
    price: number;
    title: string;
    bathroom: number;
    bedroom: number;
    unitArea: number | string;
    className?: string
}
export default function PostCard({ image, price, title, bathroom, bedroom, unitArea, className }: IPostCardProps) {
  return (
    <>
     <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: .3 }}>
      <section
        className={`rounded-xl border shadow-sm group cursor-pointer
            hover:shadow-lg transition-shadow duration-400 ease-in-out md:max-w-[300px]} ${className}`}
      >
        <header className="">
          <Image
            src={image}
            width={1000}
            height={1000}
            alt="post image"
            className="w-full aspect-video max-h-40 object-cover rounded-t-xl"
          />
        </header>

        <section className="px-3 py-2 space-y-1">
          <div>
            <p className="font-extrabold text-lg">{convertToCurrency(price)}</p>
          </div>
          <div className="flex items-center gap-3 text-sm font-medium">
            <div className="inline-flex items-center">
              <Bed className="text-slate-400" size={20} />
              <p>{bedroom}</p>
            </div>
            <div className="inline-flex items-center">
              <Bath className="text-slate-400" size={20} />
              <p>{bathroom}</p>
            </div>
            <div className="inline-flex items-center">
              <Ruler className="text-slate-400" size={20} />
              <p>{unitArea} <span>sqft</span></p>
            </div>
          </div>
          <div className="">
            <p className="text-sm text-slate-800 truncate">{title}</p>
          </div>
          
        </section>
      </section>
      </motion.div>
    </>
  );
}
