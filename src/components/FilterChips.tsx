"use client";

import { propertyType } from "@/utils/links";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/input";
import { ChangeEvent, useState } from "react";

type TFilter = {
  minPrice: string;
  maxPrice: string;
  types: "rent" | "buy";
  bed: string;
  bath: string;
  property: "condo" | "apartment" | "land" | "house";
}
export default function FilterChips() {
  const types = ["rent", "buy"];
  const [filter, setFilter] = useState<TFilter>({
    minPrice: "",
    maxPrice: "",
    types: "buy",
    bath: "",
    bed: "",
    property: "apartment"
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>){
   const { value, name } = e.target; 
    setFilter((curState: TFilter) => {
      return {
       ...curState,
       [name]: value
      }
    });
  }



  return (
    <>
      <div>
        <div className="flex gap-2">
          <div className="relative">
            <Popover>
              <PopoverTrigger className="border hover:bg-slate-200 border-slate-300 px-3 py-2 rounded-md text-sm">
                By Price
              </PopoverTrigger>
              <PopoverContent>
                <div>
                  <p className="text-slate-400 pb-3">Price range</p>
                  <form action="" className="grid gap-4">
                    <Input onChange={handleChange} type="number" name="minPrice" value={filter.minPrice} placeholder="Min. price" />
                    <Input onChange={handleChange} type="number" name="maxPrice" value={filter.maxPrice} placeholder="Max. price" />
                    <Button type="submit" className="w-full bg-brand-primary hover:bg-blue-600">Apply</Button>
                  </form>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="relative">
            <Popover>
              <PopoverTrigger className="border hover:bg-slate-200 border-slate-300 px-3 py-2 rounded-md text-sm">
                Property type
              </PopoverTrigger>
              <PopoverContent>
                <p className="pb-2 text-slate-400 ">Home types</p>
                <div className="w-full">
                  {propertyType.map((property) => {
                    return (
                      <div
                        key={property}
                        className="flex gap-3 items-center mb-2 cursor-pointer"
                      >
                        <Input onChange={handleChange} value={property} 
                        name="property" id={property}
                        type="radio" 
                        checked={filter.property === property}
                        className="w-3 h-3" />
                        <label
                          htmlFor={property}
                          className="capitalize text-sm cursor-pointer"
                        >
                          {property}
                        </label>
                      </div>
                    );
                  })}
                  <Button type="submit" className="w-full bg-brand-primary hover:bg-blue-600">Apply</Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Popover>
              <PopoverTrigger className="border hover:bg-slate-200 border-slate-300 px-3 py-2 rounded-md text-sm">
                Type
              </PopoverTrigger>
              <PopoverContent>
                <form action="" className="w-full">
                <p className="text-slate-400 pb-3">Type mode</p>
                {types.map((type) => {
                  return (
                    <div
                      key={type}
                      className="flex gap-3 items-center mb-2 cursor-pointer"
                    >
                      <Input onChange={handleChange} id={type} type="radio"
                      checked={filter.types === type}
                      value={type}
                      name="types"
                       className="w-3 h-3" />
                      <label
                        htmlFor={type}
                        className="capitalize text-sm cursor-pointer"
                      >
                        {type}
                      </label>
                    </div>
                  );
                })}
                <Button type="submit" className="w-full bg-brand-primary hover:bg-blue-600">Apply</Button>
                </form>
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Popover>
              <PopoverTrigger className="border hover:bg-slate-200 border-slate-300 px-3 py-2 rounded-md text-sm">
                Number Bed/Bath
              </PopoverTrigger>
              <PopoverContent>
                <div>
                  <p className="text-slate-400 pb-3">
                    Number Bathroom / Bedroom
                  </p>
                  <form action="" className="grid gap-4">
                    <Input onChange={handleChange} value={filter.bed} name="bed" placeholder="Num. bed" />
                    <Input onChange={handleChange} value={filter.bath} name="bath" placeholder="Num. bath" />
                    <Button type="submit" className="bg-brand-primary hover:bg-blue-600">Apply</Button>
                  </form>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
}
