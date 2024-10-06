import { ChangeEvent, forwardRef } from "react";
import { Input } from "./input";

import { ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";

interface IAmenitiesInputHeaderProps {
  isActive: boolean;
  title: string;
}
export function AmenitiesInputHeader({
  isActive,
  title,
}: IAmenitiesInputHeaderProps) {
  return (
    <div className="amenities_container">
      <div className="room_details">
        <header className="flex justify-between items-center gap-2 py-2 bg-slate-50 text-brand-primary text-sm cursor-pointer">
          <h2 className="uppercase">{title}</h2>
          {!isActive ? <ChevronDown /> : <ChevronUp />}
        </header>
      </div>
    </div>
  );
}

interface IAmenitiesInputProps {
  title: string;
  list: string[];
  type: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>, item?: string) => void;
  name?: string;
  checked?: (item: string) => boolean;
  item?: string;
  value?: string;
}



export function AmenitiesInput({
  list,
  type,
  title,
  onChange = () => {},
  name,
  checked,
  value
}: IAmenitiesInputProps) {
  return (
    <>
      <div className="">
        <h3 className="uppercase text-gray-400 text-sm">{title}</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {list.map((item, index) => {
            return (
              <div key={index} className="flex items-center gap-3">
                <label htmlFor={item}>{item}</label>
                <Input
                  type={type}
                  id={item}
                  className={`w-3 aspect-square ${clsx({'cursor-pointer': type === 'checkbox'})}`}
                  onChange={(e) => onChange?.(e, item)}
                  name={name}
                  value={type === 'text' ? value : item}
                  checked={type === 'checkbox' ? checked?.(item) : undefined}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
