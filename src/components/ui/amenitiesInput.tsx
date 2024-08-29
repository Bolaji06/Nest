import { forwardRef } from "react";
import { Input } from "./input";

import { ChevronDown, ChevronUp } from "lucide-react";

interface IAmenitiesInputHeaderProps {
    isActive: boolean,
    title: string,
}
export function AmenitiesInputHeader({ isActive, title }: IAmenitiesInputHeaderProps) {
  return (
    <div className="amenities_container">
      <div className="room_details">
        <header className="flex justify-between items-center gap-2 py-2 bg-slate-50 text-brand-primary text-sm cursor-pointer">
          <h2 className="uppercase">{title}</h2>
          {!isActive ? <ChevronDown />: <ChevronUp /> }
        </header>
       
      </div>
    </div>
  );
}

interface IAmenitiesInputProps {
  title: string;
  list: string[];
  type: string;
}
export function AmenitiesInput({ list, type, title }: IAmenitiesInputProps) {
  return (
    <>
      <div className="">
        <h3 className="uppercase text-gray-400 text-sm">{title}</h3>
        <div className="grid grid-cols-4">
          {list.map((item, index) => {
            return (
              <div key={index} className="flex items-center gap-3">
                <label htmlFor={item}>{item}</label>
                <Input type={type} id={item} className="w-3 aspect-square" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}