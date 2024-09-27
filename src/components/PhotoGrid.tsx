"use client";

import { Button } from "./ui/button";
import Image from "next/image";
import { Images } from "lucide-react";

import { useState } from "react";
import { createPortal } from "react-dom";
import PhotoPreview from "./PhotoPreview";
import { Post } from "@/lib/definitions";

type TPhotoGridProps = {
  data: Post;
};
export default function PhotoGrid({ data }: TPhotoGridProps) {
  const [togglePreview, setTogglePreview] = useState<boolean>(false);

  function handleTogglePreview() {
    setTogglePreview((curState) => !curState);
  }

  return (
    <>
      <section className="relative  ">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1">
          <div
            className="w-full md:w-[400px] md:aspect-square  md:col-span-2 md:row-span-3
                md:rounded-tl-3xl md:rounded-bl-3xl relative"
          >
            <Button
              className="absolute top-2 right-2 rounded-sm hover:bg-slate-200 bg-white/50 text-gray-900"
              onClick={handleTogglePreview}
            >
              <Images size={14} />
              <p className="px-2">All Photos ({data.images?.length})</p>
            </Button>
            <Image
              src={data.images?.[0]}
              alt="image"
              width={1000}
              height={1000}
              className="object-cover w-full aspect-video md:aspect-square md:rounded-tl-3xl md:rounded-bl-3xl"
            />
          </div>
          <div className="w-[200px] aspect-square hidden lg:block">
            <Image
              src={data.images?.[1]}
              alt="image"
              width={1000}
              height={1000}
              className="object-cover w-full aspect-square"
            />
          </div>
          <div className="w-[200px] aspect-square md:rounded-tr-3xl hidden md:block">
            <Image
              src={data.images?.[2]}
              alt="image"
              width={1000}
              height={1000}
              className="object-cover w-full aspect-square md:rounded-tr-3xl"
            />
          </div>
          <div className="w-[200px] aspect-square hidden lg:block">
            <Image
              src={data.images?.[3]}
              alt="image"
              width={1000}
              height={1000}
              className="object-cover w-full aspect-square"
            />
          </div>
          <div className="md:w-[200px] aspect-square md:rounded-br-3xl hidden md:block">
            <Image
              src={data.images?.[4]}
              alt="image"
              width={1000}
              height={1000}
              className="object-cover w-full aspect-square md:rounded-br-3xl"
            />
          </div>
        </div>
        {togglePreview &&
          createPortal(
            <div className="h-screen overflow-hidden">
              <PhotoPreview
                data={data}
                handleTogglePreview={handleTogglePreview}
              />
            </div>,
            document.body
          )}
      </section>
    </>
  );
}
