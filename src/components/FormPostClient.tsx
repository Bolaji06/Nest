"use client";

import Link from "next/link";
import { Input } from "./ui/input";
import { propertyType } from "@/utils/links";
import { postSchema, postSchemaType } from "@/utils/validation";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { ZodError } from "zod";
import { Button } from "./ui/button";
import { ImageUp, LoaderCircle } from "lucide-react";
import clsx from "clsx";
import { useToast } from "./ui/use-toast";
import { redirect } from "next/navigation";
import UploadFiles, { UploadFilesHandle } from "./UploadFiles";
import { uploadPostImage } from "@/lib/firebaseStorage";

type TCookie = {
  cookieData: string | undefined;
};
type TInputError = {
  message: string;
  path: (string | number)[];
};
interface IPostData {
  success: boolean;
}

export default function FormPostClient({ cookieData }: TCookie) {
  const [listingForm, setListingForm] = useState<postSchemaType>({
    title: "",
    price: 0,
    address: "",
    bathroom: 0,
    bedroom: 0,
    city: "",
    description: "",
    longitude: "",
    latitude: "",
    property: "house",
    type: "buy",
    //images: [""],
  });
  const [inputError, setInputError] = useState<TInputError>({
    message: "",
    path: [],
  });
 

  const [postData, setPostData] = useState<IPostData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [postImageUrls, setPostImageUrls] = useState<string[]>([]);
  const [isFormFilled, setIsFormFilled] = useState<boolean>(true);

  const { toast } = useToast();

  function handleQuillChange(value: string) {
    setListingForm((curState) => {
      return {
        ...curState,
        description: value,
      };
    });
  }

  function handleFormChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setListingForm((curState) => {
      return {
        ...curState,
        [name]: value,
      };
    });
    setIsFormFilled(Object.values(listingForm).some((field) => field === ""));
  }

  // using a function in from a child component
  const uploadFilesRef = useRef<UploadFilesHandle>(null);

  async function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const API_ENDPOINT = "http://localhost:7000/api/post";

    let imageUrls: string[] = [];

    try {
      setLoading(true);
      const parseSchema = postSchema.parse(listingForm);
      if (!cookieData) {
        return;
      }

      // using the child function here:
      if (uploadFilesRef.current) {
        imageUrls = await uploadFilesRef.current.uploadImage();
      }
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookieData,
        },
        body: JSON.stringify({
          ...parseSchema,
          images: imageUrls,
        }),
      };

      const response = await fetch(API_ENDPOINT, options);
      const data = await response.json();
      setPostData(data);
    } catch (err) {
      if (err instanceof ZodError) {
        const inputError = err.errors.map((issues) => {
          return {
            message: issues.message,
            path: issues.path,
          };
        });
        //@ts-ignore
        setInputError(inputError[0]);
        return inputError[0];
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (postData?.success) {
      toast({
        title: "Success",
        description: "Post Sent successfully",
      });
      redirect("/account/all_post");
    }
  }, [postData?.success]);

  console.log(postData);

  //console.log(postImageUrls);

  return (
    <>
      <main className="pb-20">
        <header className="max-w-lg space-y-3">
          <h1 className="text-3xl text-brand-text">For Sale Listing</h1>
          <p className="text-muted-foreground">
            Post once and your home will be listed on{" "}
            <Link href={"/about"} className="font-bold underline">
              Nest
            </Link>
            , reaching buyers on the largest real estate network on the Web.
            Plus, home shoppers receive emails about new homes on the market –
            including yours.
          </p>
        </header>

        <form onSubmit={handleOnSubmit} className="py-4 pr-6 text-sm space-y-2">
          {/* <div>
            <input defaultValue={postImageUrls} readOnly name="images" hidden />
          </div> */}
          <div className="space-y-1">
            <label htmlFor="title">Title</label>
            <Input
              className="text-base"
              id="title"
              name="title"
              value={listingForm.title}
              placeholder="Enter short listing title"
              onChange={handleFormChange}
            />
            {inputError.path?.[0] === "title" && (
              <p className="text-xs text-red-500">{inputError.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <label htmlFor="address">Address</label>
            <Input
              className="text-base"
              name="address"
              id="address"
              placeholder="Enter address"
              onChange={handleFormChange}
              value={listingForm.address}
            />
            {inputError.path?.[0] === "address" && (
              <p className="text-sm text-red-500">{inputError.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 space-y-2">
            <div className="pt-2 space-y-2">
              <label htmlFor="type" className="">
                Select Type
              </label>
              <select
                onChange={handleFormChange}
                value={listingForm.type}
                name="type"
                id="type"
                className="w-full border capitalize focus-visible:outline-none focus-visible:ring-2 ring-offset-blue-500 focus-visible:ring-offset-2 rounded-md py-3"
              >
                <option value="buy">Sell</option>
                <option value="rent">Rent</option>
              </select>
              {!true && <p>Error msg</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="property" className="py-1">
                Select Property Type
              </label>
              <select
                onChange={handleFormChange}
                name="property"
                value={listingForm.property}
                id="property"
                className="w-full border capitalize focus-visible:outline-none focus-visible:ring-2 ring-offset-blue-500 focus-visible:ring-offset-2 rounded-md py-3"
              >
                {propertyType.map((property) => {
                  return (
                    <option
                      key={property}
                      value={property}
                      className="capitalize"
                    >
                      {property}
                    </option>
                  );
                })}
              </select>
              {!true && <p>Error msg</p>}
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="price">
              {listingForm.type === "rent" ? "Monthly Rent" : "Price"}
            </label>
            <Input
              onChange={handleFormChange}
              value={listingForm.price}
              className="text-base"
              type="number"
              name="price"
              placeholder="Enter amount"
            />
            {inputError.path?.[0] === "price" && (
              <p className="text-sm text-red-500">{inputError.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <label htmlFor="city">City</label>
            <Input
              onChange={handleFormChange}
              value={listingForm.city}
              className="text-base"
              name="city"
              placeholder="Enter listing city"
              id="city"
            />
            {inputError.path?.[0] === "address" && (
              <p className="text-sm text-red-500">{inputError.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="longitude">Longitude</label>
              <Input
                onChange={handleFormChange}
                value={listingForm.longitude}
                className="text-base"
                type="number"
                name="longitude"
                id="longitude"
                placeholder="Enter longitude"
              />
              {inputError.path?.[0] === "longitude" && (
                <p className="text-sm text-red-500">{inputError.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <label htmlFor="latitude">Latitude</label>
              <Input
                onChange={handleFormChange}
                value={listingForm.latitude}
                className="text-base"
                type="number"
                id="latitude"
                name="latitude"
                placeholder="Enter latitude"
              />
              {inputError.path?.[0] === "latitude" && (
                <p className="text-sm text-red-500">{inputError.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="bedroom">Bedroom</label>
              <Input
                onChange={handleFormChange}
                value={listingForm.bedroom}
                className="text-base"
                type="number"
                name="bedroom"
                id="bedroom"
                placeholder="Enter number of bedroom"
              />
              {inputError.path?.[0] === "bedroom" && (
                <p className="text-sm text-red-500">{inputError.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <label htmlFor="bathroom">Bathroom</label>
              <Input
                onChange={handleFormChange}
                value={listingForm.bathroom}
                className="text-base"
                type="number"
                id="bathroom"
                name="bathroom"
                placeholder="Enter number of bathroom"
              />
              {inputError.path?.[0] === "bathroom" && (
                <p className="text-sm text-red-500">{inputError.message}</p>
              )}
            </div>
          </div>

              {/* using the ref here: */}
          <UploadFiles
            ref={uploadFilesRef}
            setPostImageUrls={setPostImageUrls}
          />

          <div>
            <ReactQuill
              theme="snow"
              placeholder="Enter other amenities/utilities"
              value={listingForm.description}
              onChange={handleQuillChange}
              className="rounded-md text-base"
            />
            {inputError.path?.[0] === "description" && (
              <p className="text-sm text-red-500">{inputError.message}</p>
            )}
          </div>

          <div className="w-full lg:max-w-28">
            <Button
              type="submit"
              disabled={loading}
              aria-disabled={loading}
              className={`font-medium ${clsx({
                "bg-slate-500 cursor-not-allowed": loading,
                "bg-slate-200 cursor-not-allowed": loading,
              })} bg-brand-primary w-full
           text-white hover:bg-blue-700 flex justify-center items-center gap-3`}
            >
              {loading && (
                <LoaderCircle
                  size={16}
                  color="white"
                  className="animate-spin"
                />
              )}
              Post
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}
