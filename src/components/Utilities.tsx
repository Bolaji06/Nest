"use client";

import {
  ChangeEvent,
  FormEvent,
  startTransition,
  useEffect,
  useOptimistic,
  useState,
} from "react";
import { Button } from "./ui/button";
import {
  ISessionData,
  TPost,
  TPostAmenities,
  TPostResult,
} from "@/lib/definitions";
import { FilePenLine, Heart, X } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useFormState } from "react-dom";
import { addSavePost, removeSavedPost } from "@/lib/post";
import { boolean } from "zod";
import { convertToCurrency, formatNumber } from "@/lib/utils";
import clsx from "clsx";

import { createPortal } from "react-dom";

import { Filter, Map, SortAsc, Share, MessageCircle } from "lucide-react";
import { Input } from "./ui/input";

import { propertyType } from "@/utils/links";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";
import MapComponent from "./MapComponent";

import { Post } from "@/lib/definitions";
import dynamic from "next/dynamic";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import QRCodeGenerator from "./ui/qrcode";

import { sendEmail } from "../actions/emailAction";
import { sendEmailFormType } from "@/utils/validation";
import { FormButton } from "./FormButton";
import ChatComponent from "./ChatComponent";
import Link from "next/link";

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

    startTransition(() => {
      addOptimistic(newSavedState);
    });

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
      <div>
        <Button
          onClick={handleClick}
          className="rounded-2xl px-5 py-1 class-name bg-white inline-flex items-center gap-1 hover:bg-slate-100
                  cursor-pointer"
        >
          <Heart
            size={18}
            fill={optimisticState ? "orange" : "transparent"}
            stroke="orange"
          />
          <p className="text-gray-800 text-sm font-normal">
            {optimisticState ? "Saved" : "Save"}
          </p>
        </Button>
      </div>
    </>
  );
}

interface EditPostButtonProps {
  isPostOwner: boolean
}
export function EditPostButton({ isPostOwner }: EditPostButtonProps) {
  

  return (
    <>
      {isPostOwner && (
        <div>
          <Button
            asChild
            className="rounded-2xl px-5 py-1 class-name bg-white inline-flex items-center gap-1 hover:bg-slate-100
                  cursor-pointer"
          >
            <Link href={"/"}>
              <FilePenLine className="text-red-500" size={18} />
              <p className="text-gray-800 text-sm font-normal">Edit</p>
            </Link>
          </Button>
        </div>
      )}
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
            <div
              className="fixed top-20 right-2 z-50 p-2 bg-slate-100 rounded-full"
              onClick={handleToggleMap}
            >
              <X size={16} />
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

interface IShareButton {
  data: TPostAmenities;
}
export function ShareButton({ data }: IShareButton) {
  const [toggleEmail, setToggleEmail] = useState<boolean>(true);
  const [toggleQR, setToggleQR] = useState<boolean>(false);

  const [state, action, isPending] = useFormState(sendEmail, {});

  const { toast } = useToast();

  function handleToggleEmail() {
    setToggleEmail(true);
    setToggleQR(false);
  }

  function handleToggleQR() {
    setToggleEmail(false);
    setToggleQR(true);
  }

  useEffect(() => {
    if (state.success) {
      toast({
        title: "Email sent!",
        description: "Listing shared successfully",
      });
    }
  }, [state.success]);

  return (
    <>
      <Dialog>
        <DialogTrigger
          className="rounded-2xl px-5 py-2 class-name bg-white inline-flex items-center gap-1 hover:bg-slate-100
                  cursor-pointer"
        >
          <Share size={18} />
          <p className="text-sm text-gray-800">Share</p>
        </DialogTrigger>
        <DialogContent className="h-full overflow-auto bar">
          <h3 className="text-2xl font-bold">Share</h3>
          <DialogHeader>
            <div className="flex gap-3">
              <Image
                src={data.message.post.images[0]}
                width={500}
                height={500}
                alt={data.message.post.title}
                className="w-40 aspect-video rounded-2xl"
              />
              <div>
                <p className="font-semibold text-xl">
                  {convertToCurrency(data.message.post.price)}
                </p>
                <p className="text-sm">{data.message.post.city}</p>
                <p className="text-sm">
                  {data.message.post.bedroom}
                  <span className="font-bold px-2">Beds</span>
                </p>
                <p className="text-sm">
                  {data.message.post.bathroom}
                  <span className="font-bold px-2">Bath</span>
                </p>
              </div>
            </div>
          </DialogHeader>
          <DialogHeader className="flex flex-row justify-between items-center w-full mt-3">
            <div
              onClick={handleToggleEmail}
              className={`cursor-pointer ${clsx({
                "border-b-4": toggleEmail,
              })} rounded-tl-2xl border-b-blue-500 pb-2`}
            >
              <DialogTitle className="font-medium">Email</DialogTitle>
            </div>

            <div
              onClick={handleToggleQR}
              className={`cursor-pointer ${clsx({
                "border-b-4": toggleQR,
              })} border-b-blue-500 pb-2`}
            >
              <DialogTitle className="font-medium">QR Code</DialogTitle>
            </div>
          </DialogHeader>

          {toggleEmail && (
            <div>
              <form action={action} className="space-y-3">
                <div>
                  <label htmlFor="to" className="text-sm">
                    To:
                  </label>
                  <Input
                    id="to"
                    className=""
                    placeholder="Receiver email"
                    name="to"
                    autoFocus={true}
                  />
                  {state.field === "to" && (
                    <p className="text-xs text-red-500">{state.status}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="user" className="text-sm">
                    Your Email:
                  </label>
                  <Input
                    id="user"
                    className=""
                    placeholder="Your email"
                    name="from"
                    defaultValue={data.message.post.user.username}
                  />
                  {state.field === "from" && (
                    <p className="text-xs text-red-500">{state.status}</p>
                  )}
                </div>

                <input
                  name="postId"
                  defaultValue={data.message.post.id}
                  readOnly
                  aria-readonly
                  hidden
                  aria-hidden
                />

                <div className="w-full">
                  <label id="message" className="text-sm">
                    Message
                  </label>
                  <textarea
                    id="message"
                    defaultValue={
                      "Check out " + data.message.post.title + " on Nest"
                    }
                    name="message"
                    className="w-full text-sm border p-2 focus-visible:outline-none focus-visible:ring-2 ring-offset-blue-500 focus-visible:ring-offset-2 rounded-md py-3"
                  />
                  {state.field === "message" && (
                    <p className="text-xs text-red-500">{state.message}</p>
                  )}
                </div>
                <FormButton text="Send" />
              </form>
            </div>
          )}

          {toggleQR && (
            <div>
              <QRCodeGenerator
                imageName={data.message.post.title}
                className="flex gap-4 mt-1 flex-col justify-center items-center"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

interface ChatButtonProps {
  post: TPost;
  token: string | undefined;
  userId: string | undefined;
  status: string | undefined;
}
export function ChatButton({ post, token, userId, status }: ChatButtonProps) {
  const [toggleChat, setToggleChat] = useState<boolean>(false);
  const { toast } = useToast();

  function openChat() {
    if (!token) {
      toast({
        title: "Kindly sign in",
        description: "You need to login to chat",
      });
    } else {
      setToggleChat(true);
    }
  }

  return (
    <>
      <div className="w-full">
        <Button
          onClick={openChat}
          className="w-full rounded-2xl text-left inline-flex gap-3 bg-white lg:bg-transparent text-brand-primary border border-blue-700 hover:bg-blue-100"
        >
          <MessageCircle size={16} />
          Chat {post.user && post.user?.username}
        </Button>
      </div>
      {toggleChat && (
        <ChatComponent
          post={post}
          setToggleChat={setToggleChat}
          toggleChat={toggleChat}
          userId={userId}
          status={status}
        />
      )}
    </>
  );
}
