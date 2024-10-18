import { TAmenities, TPostAmenities } from "@/lib/definitions";
import React from "react";

type AmenitiesProps = {
  amenities: string[];
  category: string;
};
export function Amenities({ amenities, category }: AmenitiesProps) {
  return (
    <>
      <main>
        <section>
          <div className="mt-1">
            <div className="flex xs:flex-col gap-1 py-1 xs:text-base">
              <h2 className="font-semibold">{category}</h2>
              {amenities.map((item, index) => {
                const isLastItem = index === amenities.length - 1;
                return (
                  <p key={index} className="capitalize inline-flex">
                    {item}
                    {!isLastItem && <span className="xs:hidden">{", "}</span>}
                  </p>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

interface IAmenitiesHeaderProps {
  icon: React.ReactNode;
  header: string;
}
export function AmenitiesHeader({ icon, header }: IAmenitiesHeaderProps) {
  return (
    <>
      <header className="flex items-center gap-3 bg-slate-100 py-1 px-3 rounded-t-2xl">
        <div className="text-base">
           {icon} 
        </div>
        
        <h2 className="font-medium">{header}</h2>
      </header>
    </>
  );
}
