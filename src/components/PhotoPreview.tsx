"use client";

import { Post } from "@/lib/definitions";
import { X, Bed, Ruler, Bath, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Suspense, useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

type TPreviewProps = {
  data: Post;
  handleTogglePreview: () => void;
};
export default function PhotoPreview({
  data,
  handleTogglePreview,
}: TPreviewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? data?.images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === data?.images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <>
      <main className="overflow-y-hidden max-h-screen">
        <div className="absolute inset-0 bg-black/90 z-50 ">
          <nav className="border-b border-slate-800 px-4 py-2 flex justify-between items-center">
            <div className="inline-flex justify-center items-center gap-4">
              <Button
                className="bg-transparent hover:bg-transparent"
                onClick={handleTogglePreview}
              >
                <X className="text-base text-white cursor-pointer hover:text-brand-primary" />
              </Button>

              <div className="text-gray-50">
                <p>{data.title}</p>
              </div>
            </div>

            <div className="flex gap-3 md:gap-10 items-center justify-center md:justify-normal">
              <div className="flex items-center gap-1 md:gap-3 text-gray-800">
                <Bed size={20} className="text-gray-50" />
                <p className="">
                  {data.bedroom} <span className="text-gray-50">Bed</span>
                </p>
              </div>

              <div className="flex items-center gap-1 md:gap-3 text-gray-50">
                <Bath size={20} className="text-gray-50" />
                <p className="text-gray-50">
                  {data.bathroom} <span className="">Bathroom</span>
                </p>
              </div>

              <div className="flex items-center gap-1 md:gap-3 text-gray-800">
                <Ruler size={20} className="text-gray-50" />
                <p className="text-gray-50">
                  {data.unitArea ? data.unitArea.toLocaleString() : "1,243"}{" "}
                  <span className="">Sqft.</span>
                </p>
              </div>
            </div>
          </nav>

          <div className="flex gap-4 items-center my-3 ml-10">
            <Button
              onClick={goToPrevious}
              className="w-10 p-0 text-gray-950 hover:text-gray-100 hover:bg-transparent hover:border hover:border-slate-200 aspect-square rounded-full bg-gray-300"
            >
              <ChevronLeft className="" />
            </Button>
            <Button
              onClick={goToNext}
              className="w-10 p-0 hover:bg-transparent text-gray-950 hover:text-gray-100 hover:border hover:border-slate-200 aspect-square rounded-full bg-gray-300"
            >
              <ChevronRight />
            </Button>
          </div>

          <main className="w-full flex justify-center items-center">
            <section className="flex w-[700px] justify-center align-middle items-center">
              <div className="w-full">
                <Image
                  src={data.images[currentIndex]}
                  width={500}
                  height={500}
                  className="w-full aspect-video rounded-2xl object-cover"
                  alt="photo"
                />
              </div>
            </section>
          </main>
        </div>
      </main>
    </>
  );
}
