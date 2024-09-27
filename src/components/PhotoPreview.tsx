"use client";

import { Post } from "@/lib/definitions";
import { X, Bed, Ruler, Bath, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Suspense, useEffect, useRef, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import clsx from "clsx";
import { Smokum } from "next/font/google";

type TPreviewProps = {
  data: Post;
  handleTogglePreview: () => void;
};
export default function PhotoPreview({
  data,
  handleTogglePreview,
}: TPreviewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const previousIndexRef = useRef(currentIndex);

  useEffect(() => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    const isScrollingUp = currentIndex < previousIndexRef.current;
    previousIndexRef.current = currentIndex;

    const scrollPosition = Math.max(0, (currentIndex - 1) * 100);

    slider.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });

    if (isScrollingUp && currentIndex === 0) {
      slider.scrollTo({
        top: 100,
        behavior: "smooth"
      })
    }
  }, [currentIndex]);

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

  function goToPhoto(index: number) {
    setCurrentIndex(index);
  }

  return (
    <>
      <main className="overflow-y-hidden max-h-screen">
        <div className="absolute inset-0 bg-black/90 z-50 backdrop-blur-md">
          <nav className="border-b border-slate-800 px-4 py-2 flex justify-between items-center">
            <div className="inline-flex justify-center items-center gap-4">
              <Button
                className="bg-transparent hover:bg-transparent"
                onClick={handleTogglePreview}
              >
                <X className="text-base text-white cursor-pointer hover:text-brand-primary" />
              </Button>

              <div className="text-gray-50 px-3">
                <p className="font-semibold">{data.title}</p>
              </div>
            </div>

            <div>
              <h2 className="text-gray-50 font-bold">
                {currentIndex + 1} / {data.images.length}
              </h2>
            </div>

            <div className="hidden md:flex gap-3 md:gap-10 items-center justify-center md:justify-normal">
              <div className="flex items-center gap-1 md:gap-3 text-gray-800">
                <Bed size={20} className="text-gray-50" />
                <p className="text-gray-50">
                  {data.bedroom} <span>Bed</span>
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

          <div className="flex gap-4 items-center my-3 ml-8">
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

          <main className="w-full flex justify-center items-center mt-10 md:mt-0">
            <section className="flex w-[700px] justify-center align-middle items-center">
              <div className="lg:w-full px-6 md:px-0">
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

        <div className="hidden lg:block absolute top-28 overflow-hidden w-20 max-h-[400px] z-50 right-14">
          {/* <div className="absolute blur bg-black/90 w-full h-10 rounded-t-xl -top-2"/> */}
          <div
            className="overflow-y-auto max-h-[400px] space-y-2 w-full hide-scroll"
            ref={sliderRef}
          >
            {data.images.map((photo, index) => {
              return (
                <div
                  key={photo}
                  className={`w-full aspect-square rounded-xl gap-3 h-full cursor-pointer 
                    ${clsx({
                      "border-2 border-slate-100": index === currentIndex,
                    })}`}
                  onClick={() => goToPhoto(index)}
                >
                  <Image
                    src={photo}
                    alt="photo"
                    width={500}
                    height={500}
                    className="w-full rounded-xl aspect-square"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
