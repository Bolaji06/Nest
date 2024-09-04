"use client";

import Link from "next/link";
import { Input } from "./ui/input";
import {
  appliance,
  architecturalStyle,
  basement,
  buildingAmenities,
  coolingType,
  exterior,
  floorCovering,
  heatingFuel,
  heatingType,
  indoorFeatures,
  outdoorAmenities,
  parking,
  propertyType,
  roof,
  rooms,
  view,
} from "@/utils/links";
import { postSchema, postSchemaType } from "@/utils/validation";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { ZodError } from "zod";
import { Button } from "./ui/button";
import { ChevronDown, ImageUp, LoaderCircle } from "lucide-react";
import clsx from "clsx";
import { useToast } from "./ui/use-toast";
import { redirect } from "next/navigation";
import UploadFiles, { UploadFilesHandle } from "./UploadFiles";
import { uploadPostImage } from "@/lib/firebaseStorage";
import Select from "./ui/select";
import dynamic from "next/dynamic";
import TextEditor from "@/components/TextEditor";
import { revalidateTag } from "next/cache";
import { AmenitiesInput, AmenitiesInputHeader } from "./ui/amenitiesInput";

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

let API_ENDPOINT = "";

if (process.env.NODE_ENV === "production") {
  API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_PROD_POST}`;
} else if (process.env.NODE_ENV === "development") {
  API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_DEV_POST}`;
}

const toolbarOptions = [
  [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ align: [] }],
  ["bold", "italic", "underline", "strike"],
  ["clean"],
];

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
    unitArea: 0,
    amenities: {
      roomDetails: {
        appliance: [],
        basement: "none",
        floorCovering: [],
        indoorFeatures: [],
        rooms: [],
      },
      buildingDetails: {
        architecturalStyle: "",
        buildingAmenities: [],
        exterior: [],
        numFloor: 0,
        numUnit: 0,
        outdoorAmenities: [],
        parking: [],
        parkingSpace: 0,
        roof: [],
        view: [],
      },
      utilitiesDetails: {
        coolingType: [],
        heatingFuel: [],
        heatingType: [],
      },
    },
  });
  const [inputError, setInputError] = useState<TInputError>({
    message: "",
    path: [],
  });

  const modules = {
    toolbar: toolbarOptions,
  };

  //  const ReactQuill = useMemo(() => {
  //   return dynamic(import("@/components/TextEditor"), { ssr: false })
  //  }, [])

  const [postData, setPostData] = useState<IPostData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [postImageUrls, setPostImageUrls] = useState<string[]>([]);
  const [isFormFilled, setIsFormFilled] = useState<boolean>(true);

  const [toggleRoomDetails, setToggleRoomDetails] = useState<boolean>(false);
  const [toggleBuildingDetails, setToggleBuildingDetails] =
    useState<boolean>(false);
  const [toggleUtilitiesDetails, setToggleUtilitiesDetails] =
    useState<boolean>(false);

  function handleToggleRoomDetails() {
    setToggleRoomDetails(!toggleRoomDetails);
  }
  function handleToggleBuildingDetails() {
    setToggleBuildingDetails(!toggleBuildingDetails);
  }
  function handleToggleUtilityDetails() {
    setToggleUtilitiesDetails(!toggleUtilitiesDetails);
  }

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
      revalidateTag("get_posts");
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
      } else if (err instanceof Error) {
        return err;
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
              <label htmlFor="type">Select Type</label>
              <Select
                list={["buy", "rent"]}
                id="type"
                name="type"
                value={listingForm.type}
                onChange={handleFormChange}
              />
              {inputError.path?.[0] === "type" && (
                <p className="text-sm text-red-500">{inputError.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="property">Property Type</label>
              <Select
                name="property"
                id="property"
                onChange={handleFormChange}
                value={listingForm.property}
                list={propertyType}
              />
              {inputError.path?.[0] === "property" && (
                <p className="text-sm text-red-500">{inputError.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
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
                id="price"
                placeholder="Enter amount"
              />
              {inputError.path?.[0] === "price" && (
                <p className="text-sm text-red-500">{inputError.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="size">Property Size</label>
              <Input
                onChange={handleFormChange}
                value={listingForm.unitArea}
                className="text-base"
                type="number"
                name="unitArea"
                id="size"
                placeholder="Enter amount"
              />
              {inputError.path?.[0] === "unitArea" && (
                <p className="text-sm text-red-500">{inputError.message}</p>
              )}
            </div>
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
              modules={modules}
            />

            {inputError.path?.[0] === "description" && (
              <p className="text-sm text-red-500">{inputError.message}</p>
            )}
          </div>

          <div className="py-6 relative mt-6">
            <div className="absolute w-full h-[1px] bg-slate-200" />
            <h2 className="bg-white text-base absolute top-[12px] left-1/2 -translate-x-1/2">
              Amenities
            </h2>
          </div>

          <div onClick={handleToggleRoomDetails}>
            <AmenitiesInputHeader
              isActive={toggleRoomDetails}
              title="Room Details"
            />
          </div>
          {toggleRoomDetails && (
            <div>
              <AmenitiesInput title="Rooms" list={rooms} type="checkbox" />
              <AmenitiesInput
                title="Floor Covering"
                list={floorCovering}
                type="checkbox"
              />

              <AmenitiesInput
                title="Appliance"
                list={appliance}
                type="checkbox"
              />

              <AmenitiesInput title="Basement" list={basement} type="radio" />

              <AmenitiesInput
                title="Indoor Features"
                list={indoorFeatures}
                type="checkbox"
              />
            </div>
          )}

          <div onClick={handleToggleBuildingDetails}>
            <AmenitiesInputHeader
              isActive={toggleBuildingDetails}
              title="Building Details"
            />
          </div>
          {toggleBuildingDetails && (
            <div>
              <AmenitiesInput
                title="Building Amenities"
                list={buildingAmenities}
                type="checkbox"
              />

              <div>
                <AmenitiesInput
                  title="architectural Style"
                  list={architecturalStyle}
                  type="radio"
                />
                {/* Num of units / floor here */}
              </div>

              <AmenitiesInput
                title="Exterior"
                list={exterior}
                type="checkbox"
              />

              <AmenitiesInput
                title="Exterior"
                list={exterior}
                type="checkbox"
              />
              <AmenitiesInput
                title="Outdoor amenities"
                list={outdoorAmenities}
                type="checkbox"
              />
              <div>
                <AmenitiesInput
                  title="Parking"
                  list={parking}
                  type="checkbox"
                />
                {/* Num of parking space here */}
              </div>
              <AmenitiesInput title="Roof" list={roof} type="checkbox" />
              <AmenitiesInput title="View" list={view} type="checkbox" />
            </div>
          )}

          <div onClick={handleToggleUtilityDetails}>
            <AmenitiesInputHeader
              title="Utilities"
              isActive={toggleUtilitiesDetails}
            />
          </div>
          {toggleUtilitiesDetails && (
            <div>
              <AmenitiesInput
                title="Cooling Type"
                list={coolingType}
                type="checkbox"
              />
              <AmenitiesInput
                title="Heating Type"
                list={heatingType}
                type="checkbox"
              />
              <AmenitiesInput
                title="Heating Fuel"
                list={heatingFuel}
                type="checkbox"
              />
            </div>
          )}

          <div className="w-full lg:max-w-28">
            <Button
              type="submit"
              // disabled={loading}
              // aria-disabled={loading}
              className={`font-medium cursor-pointer ${clsx({
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
