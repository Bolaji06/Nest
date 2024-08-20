"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useOptimistic,
  useState,
} from "react";
import { Button } from "./ui/button";
import { ISessionData, TPostResult } from "@/lib/definitions";
import { Heart, X } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useFormState } from "react-dom";
import { addSavePost, removeSavedPost } from "@/lib/post";
import { boolean } from "zod";
import { formatNumber } from "@/lib/utils";
import clsx from "clsx";

import { Filter, Map, SortAsc } from "lucide-react";
import { Input } from "./ui/input";

import { propertyType } from "@/utils/links";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";
import MapComponent from "./MapComponent";

import { Post } from "@/lib/definitions";
import dynamic from "next/dynamic";

export function Modal() {
  const [closeModal, setCloseModal] = useState<boolean>(true);

  function handleModalClose() {
    setCloseModal(false);
  }

  return (
    <>
      {closeModal && (
        <section className="absolute z-10 top-52 left-1/2 -translate-x-1/2 flex justify-center items-center">
          <div className="">
            <div className="inset-0 bg-black/45" />

            <div
              className="z-20 flex flex-col space-y-3 justify-center items-center  align-middle
                    bg-white shadow-lg py-10 px-6 rounded-md"
            >
              <h2>You need to login or sign up</h2>
              <Button onClick={handleModalClose}>Ok</Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

interface SavedButtonProps {
  id: string;
  isSaved: boolean;
  session: ISessionData | null;
  token: string | undefined;
}

interface SavePostStatus {
  success: boolean;
  message: string;
}
export function SavedButton({ id, isSaved, session, token }: SavedButtonProps) {
  const { toast } = useToast();

  // optimistically updating the saved post
  const [optimisticState, addOptimistic] = useOptimistic<boolean, boolean>(
    isSaved,
    (_, optimisticValue) => optimisticValue
  );

  function handleClick() {
    if (!session) {
      toast({
        title: "Can't save Post!",
        description: "You need to login",
      });
      return;
    }

    const newSavedState = !optimisticState;
    addOptimistic(newSavedState);

    const handleSubmit = async () => {
      try {
        if (!token) {
          return;
        }
        if (newSavedState) {
          const bindAction = addSavePost.bind(null, id, token);
          await bindAction();
        } else {
          const removeAction = removeSavedPost.bind(null, id, token);
          await removeAction();
        }
      } catch (err) {
        addOptimistic(!optimisticState);
        toast({
          title: "Failed to save",
          description: "Failed to save post. Try again.",
        });
      }
    };

    handleSubmit();
  }

  return (
    <>
      <div className="mt-2">
        <Button
          onClick={handleClick}
          className="flex items-center gap-3 bg-slate-50 shadow-lg hover:bg-transparent text-base text-slate-600"
        >
          <Heart
            size={28}
            fill={optimisticState ? "orange" : "transparent"}
            stroke="orange"
          />
          {optimisticState ? "Saved" : "Save"}
        </Button>
      </div>
    </>
  );
}

export function MarkerIcon({ price }: { price: number }) {
  return (
    <>
      <div
        className={`${clsx({ "bg-green-200": price > 1000000 })}
       text-black font-semibold bg-white p-1 rounded-md shadow-md`}
      >
        {formatNumber(price)}
      </div>
    </>
  );
}

type TFilter = {
  min_price: string;
  max_price: string;
  types: "rent" | "buy" | "";
  bed: string;
  bath: string;
  property: "condo" | "apartment" | "land" | "house" | "";
};

type TFilterSMProps = {
  setToggleFilter: (curState: boolean) => void;
  handleToggleFilter: () => void;
};

function FilterSM({ setToggleFilter, handleToggleFilter }: TFilterSMProps) {
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
    setToggleFilter(false);
  }

  //console.log(filter);

  return (
    <>
      <section className="block md:hidden">
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.1 }}
        >
          <div className="z-50 filter-box absolute bg-white inset-0">
            <div className="">
              <nav className="fixed  bg-white w-full z-40 p-3 flex justify-between border-b border-slate-200">
                <h2 className="font-semibold p-2 text-slate-800">
                  Filter Search
                </h2>
                <div
                  className="hover:bg-slate-200 text-center cursor-pointer p-2 rounded-full"
                  onClick={handleToggleFilter}
                >
                  <X className="" />
                </div>
              </nav>

              <section className="relative top-16 p-3 pb-20">
                <div>
                  <h2 className="text-slate-500">Price range</h2>

                  <div className="grid grid-cols-2 gap-2">
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

                <div className="py-3">
                  <h2 className="py-2 text-slate-400">Property Type</h2>
                  <div className="w-full grid grid-cols-2">
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
                </div>

                <div>
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
                </div>

                <div className="mt-5">
                  <p className="text-slate-400">Number Bathroom / Bedroom</p>
                  <form action="" className="grid grid-cols-2 gap-2">
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
              </section>

              <div className="fixed w-full px-6 bg-white border-t border-slate-300 bottom-0 py-3">
                <Button
                  className="bg-brand-primary hover:bg-blue-600 w-full"
                  onClick={handleFilter}
                >
                  Apply All
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}

type TMapProps = {
  data: Post[];
  className?: string;
};

const DynamicMapSM = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
});
export function MapFilterSmallComponent({ data, className }: TMapProps) {
  const [toggleFilter, setToggleFilter] = useState<boolean>(false);
  const [toggleMap, setToggleMap] = useState(false);

  function handleToggleFilter() {
    setToggleFilter((curState) => !curState);
  }

  function handleToggleMap() {
    setToggleMap((curState) => !curState);
  }

  return (
    <>
      <section className="lg:hidden">
        <div className="flex gap-3 z-10 rounded-md items-center justify-between h-11 shadow-lg bg-orange-500/90 fixed bottom-6 left-1/2 -translate-x-1/2 py-2 px-3">
          <div className="" onClick={handleToggleMap}>
            <Map color="white" />
          </div>
          <div className="block md:hidden w-[1px] h-full bg-slate-200" />

          <div className="block md:hidden" onClick={handleToggleFilter}>
            <Filter color="white" />
          </div>
        </div>

        {toggleFilter && (
          <FilterSM
            setToggleFilter={setToggleFilter}
            handleToggleFilter={handleToggleFilter}
          />
        )}

        {toggleMap && (
          <>
            <div className="fixed top-20 right-2 z-50 p-2 bg-slate-100 rounded-full"
            onClick={handleToggleMap}>
              <X size={16}/>
            </div>
            <div className="absolute z-20 w-full">
              <DynamicMapSM
                data={data}
                className="rounded-none h-full max-h-full z-50"
              />
            </div>
          </>
        )}
      </section>
    </>
  );
}
