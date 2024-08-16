"use client";

import { propertyType } from "@/utils/links";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";

type TFilter = {
  min_price: string;
  max_price: string;
  types: "rent" | "buy" | "";
  bed: string;
  bath: string;
  property: "condo" | "apartment" | "land" | "house" | "";
};
export default function FilterChips() {
  const types = ["rent", "buy"];
  const [filter, setFilter] = useState<TFilter>({
    min_price: "",
    max_price: "",
    types: "",
    bath: "",
    bed: "",
    property: "",
  });
  const [selectedTerms, setSelectedTerms] = useState<string[][] | null>(null);

  const [currentUrl, setCurrentUrl] = useState("");
  const router = useRouter();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setFilter((curState: TFilter) => {
      return {
        ...curState,
        [name]: value,
      };
    });
  }

  useEffect(() => {
    const filterValues = Object.entries(filter);
    if (!filterValues.length) {
      return;
    }
    //const items = filterValues.filter((item) => item !== "")
    const items = filterValues.filter((item) => item);
    setSelectedTerms(items);

  }, [filter]);

  useEffect(() => {
    setCurrentUrl(globalThis.location.href);
  }, [currentUrl]);

  function handleFilter() {
    const newUrl = new URL("/search", currentUrl);

    Object.entries(filter).forEach(([key, value]) => {
      if (value !== "") {
        newUrl.searchParams.append(key, value);
      }
    });
    router.push(newUrl.toString());
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
                  <div className="grid gap-4">
                    <Input
                      onChange={handleChange}
                      type="number"
                      name="min_price"
                      value={filter.min_price}
                      placeholder="Min. price"
                    />
                    <Input
                      onChange={handleChange}
                      type="number"
                      name="max_price"
                      value={filter.max_price}
                      placeholder="Max. price"
                    />
                  </div>
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
                        <Input
                          onChange={handleChange}
                          value={property}
                          name="property"
                          id={property}
                          type="radio"
                          checked={filter.property === property}
                          className="w-3 h-3"
                        />
                        <label
                          htmlFor={property}
                          className="capitalize text-sm cursor-pointer"
                        >
                          {property}
                        </label>
                      </div>
                    );
                  })}
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
                        <Input
                          onChange={handleChange}
                          id={type}
                          type="radio"
                          checked={filter.types === type}
                          value={type}
                          name="types"
                          className="w-3 h-3"
                        />
                        <label
                          htmlFor={type}
                          className="capitalize text-sm cursor-pointer"
                        >
                          {type}
                        </label>
                      </div>
                    );
                  })}
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
                    <Input
                      onChange={handleChange}
                      value={filter.bed}
                      name="bed"
                      placeholder="Num. bed"
                    />
                    <Input
                      onChange={handleChange}
                      value={filter.bath}
                      name="bath"
                      placeholder="Num. bath"
                    />
                  </form>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="relative inline-block group">
            <Button
              onClick={handleFilter}
              className="bg-brand-primary h-9 flex gap-2  hover:bg-blue-600"
            >
              Apply all
            </Button>

            <div className="hidden group-hover:block transition-all rounded-md px-3 py-1 ease-in-out duration-500 z-40  absolute top-10 w-48 shadow-lg text-black bg-white">
              <ul className="">
                {selectedTerms
                  ? selectedTerms?.map(([key, value]) => {
                      return (
                        <li
                          key={key}
                          className="flex justify-between capitalize"
                        >
                          {value && (
                            <p className="text-slate-400 py-1">{key}</p>
                          )}
                          {value && <p className="py-1">{value}</p>}
                        </li>
                      );
                    })
                  : ""}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
