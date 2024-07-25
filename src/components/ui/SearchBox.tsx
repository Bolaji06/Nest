"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import SelectBox from "./select";
import { EType, EProperty } from "@/lib/definitions";
import { TSearchForm } from "@/lib/definitions";
import { propertyType } from "@/utils/links";

interface SearchBoxProps {
  className: string,
  searchFilter: boolean,
  placeholder?: string
}

export default function SearchBox({ className, searchFilter, placeholder }: SearchBoxProps) {
  const [currentUrl, setCurrentUrl] = useState<string>("")
  const [inputError, setInputError] = useState<string>("");
  const [searchForm, setSearchForm] = useState<TSearchForm>({
    title: "",
    city: "",
    minPrice: "",
    maxPrice: "",
    type: "",
    property: ""
  })
  const router = useRouter();

  useEffect(() => {
    if (!currentUrl){
      setCurrentUrl(window.location.href)
    }
  }, [currentUrl])

  function handleSearchChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>){
    const { name, value, } = e.target;
    setSearchForm((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  function handleRedirect() {
    const newUrl = new URL('/search', currentUrl);
    
    const isSearch = Object.values(searchForm).some((input) => input !== "")
    if (!isSearch) {
      setInputError('Kindly search for at least one field');
      return;
    }
    Object.entries(searchForm).forEach(([key, value]) => {
      if (value !== ""){
        newUrl.searchParams.append(key, value);
      }
    })
    setInputError("");
    router.push(newUrl.toString())
  }

  return (
    <>
      <section>
        <div className="relative">
          <Input
            className={`${className} placeholder:truncate placeholder:overflow-hidden`}
            onChange={handleSearchChange}
            placeholder={placeholder}
            name="title"
            value={searchForm.title}
            onFocus={() => setInputError("")}
          />

          <Button
            className="absolute right-0 top-0 h-full bg-transparent hover:bg-blue-500/15 rounded-l-none rounded-r-md"
            onClick={handleRedirect}
          >
            <SearchIcon color="blue" />
          </Button>
        </div>

       { searchFilter && <div className="grid grid-cols-2  gap-2 mt-2">
          {/* search by: city, type, property, price (min, max), title */}
          <SelectBox isLabel={false} onFocus={() => setInputError("")} value={searchForm.city} name="city" onChange={handleSearchChange}  list={["Lagos Abuja Runway", "Abuja"]}/>
          <SelectBox isLabel={false} onFocus={() => setInputError("")} value={searchForm.type} name="type" onChange={handleSearchChange} list={["buy", "rent"]} />
          <SelectBox className="py-1" isLabel={false} onFocus={() => setInputError("")} value={searchForm.property} name="property" onChange={handleSearchChange} list={propertyType} />
          
          <div className="grid sm:grid-cols-2 gap-2">
            <div className="relative">
              <Input value={searchForm.minPrice} placeholder="Min. price" onFocus={() => setInputError("")} onChange={handleSearchChange}
              className="pl-6 py-6" type="number" name="minPrice"/>
              <p className="absolute left-0 top-[7px] text-center p-2 text-sm text-slate-500">$</p>
            </div>
           
            <div className="relative">
              <Input value={searchForm.maxPrice} placeholder="Max. price" onFocus={() => setInputError("")} onChange={handleSearchChange}
              className="pl-6 py-6" type="number" name="maxPrice"/>
              <p className="absolute left-0 top-[7px] text-center p-2 text-sm text-slate-500">$</p>
            </div>
          </div>
          <div className="">
            <p className="text-sm text-center text-orange-200">{inputError}</p>
          </div>
          
         
        </div>}
      </section>
    </>
  );
}
