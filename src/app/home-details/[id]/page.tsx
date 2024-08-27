import { getPost } from "@/utils/data";
import NavBar2 from "@/components/NavBar2";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeDollarSign,
  Bath,
  Bed,
  Building,
  Cog,
  Heart,
  Images,
  Mail,
  MapPin,
  MessageCircle,
  Ruler,
  Share,
  Sofa,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Post, TPost, TPostAmenities, TPostResult } from "@/lib/definitions";
import { convertToCurrency } from "@/lib/utils";
import { getUserSession } from "@/lib/getSession";
import LoginSignUp from "@/components/LoginSignUp";
import NavBar from "@/components/ui/NavBar";
import { Modal, SavedButton } from "@/components/Utilities";
import { cookies } from "next/headers";
import QRCodeGenerator from "@/components/ui/qrcode";
import { Metadata } from "next";
import clsx from "clsx";
import LocationMap from "@/components/LocationMap";
import dynamic from "next/dynamic";
import PhotoGrid from "@/components/PhotoGrid";
import { Amenities, AmenitiesHeader } from "@/components/ui/amenities";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const data: TPostResult = await getPost(params.id);

  return {
    title: data.message.title,
  };
}

const DynamicLocationMap = dynamic(() => import("@/components/LocationMap"), {
  ssr: false,
});
export default async function HomeDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const data: TPostAmenities = await getPost(params.id);

  const session = await getUserSession();
  const token = cookies().get("token")?.value;
  const post = data.message;

  const amenities = post.amenities;

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="">
          <NavBar className="bg-white/70 backdrop-blur-sm border-b z-30 border-slate-100" />
        </div>

        <div className="flex justify-center items-center relative top-16 px-4">
          <div>
            <section className="">
              <header className="pt-2">
                <Button
                  asChild
                  className="flex gap-1 items-center text-brand-primary hover:bg-transparent bg-transparent font-semibold hover:underline text-left"
                >
                  <Link href={"/search"} className="">
                    <ArrowLeft size={18} />
                    Back to Search
                  </Link>
                </Button>
              </header>
              <div className="overflow-hidden max-h-screen relative z-30">
                <PhotoGrid data={post.post} />
              </div>
            </section>
          </div>
        </div>

        {/* Start the re-work here */}

        <section className="py-20 px-4">
          <div className="flex justify-between mt-6 gap-6">
            <div className="basis-full lg:basis-[70%] space-y-10">
              <div className="border border-slate-200 bg-white rounded-2xl p-7">
                <header>
                  <div className="flex justify-between items-center flex-row xs:flex-col">
                    <div
                      className="rounded-2xl px-8 h-6 class-name bg-blue-100 text-center
                  inline-flex items-center justify-center"
                    >
                      <p className="text-sm capitalize">{post.post.property}</p>
                    </div>

                    <div className="flex gap-3 xs:mt-3">
                      <div
                        className="rounded-2xl px-5 py-1 class-name bg-white inline-flex items-center gap-1 hover:bg-slate-100
                  cursor-pointer"
                      >
                        <Share size={18} />
                        <p className="text-sm text-gray-800">Share</p>
                      </div>

                      <SavedButton
                        id={post.post.id}
                        isSaved={post.isSaved}
                        session={session}
                        token={token}
                      />
                    </div>
                  </div>
                </header>

                <main className="py-5 space-y-3 ">
                  <div className="flex justify-between flex-col md:flex-row space-y-3 md:space-y-0">
                    <div>
                      <p className="xs:text-2xl text-3xl lg:text-4xl max-w-lg font-semibold">
                        {post.post.title}
                      </p>
                    </div>
                    <div className="inline-flex gap-3">
                      <p className="xs:text-xl text-3xl font-semibold">
                        {convertToCurrency(post.post.price)}
                      </p>
                    </div>
                  </div>

                  <div className="py-2 flex items-center gap-5">
                    <div className="flex items-center gap-1">
                      <BadgeDollarSign
                        size={16}
                        className={`${clsx({
                          "text-green-500": post.post.type === "buy",
                        })} text-orange-500 `}
                      />
                      <p className="capitalize text-sm px-1">
                        {post.post.type}
                      </p>
                    </div>
                    <div className="h-1 w-1 bg-gray-500 rounded-full" />
                    <div className="flex gap-1 items-center">
                      <MapPin size={16} />
                      <p className="text-sm px-1">{post.post.city}</p>
                    </div>
                  </div>

                  <div className="py-3">
                    <div className="flex gap-2 items-center">
                      <div>
                        <Image
                          src={post.post.user?.avatar}
                          alt="host user profile picture"
                          height={500}
                          width={500}
                          className="rounded-full w-12 aspect-square"
                        />
                      </div>
                      <div>
                        <p className="text-gray-500">
                          Posted By{" "}
                          <span className="text-black font-semibold hover:underline cursor-pointer">
                            {post.post.user?.username}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-[1px] bg-slate-100" />

                  <div className="py-4">
                    <div className="flex gap-3 md:gap-10 xs:text-sm items-center xs:justify-normal justify-center md:justify-normal">
                      <div className="flex items-center gap-1 md:gap-3 text-gray-800">
                        <Bed
                          size={20}
                          className="text-gray-600 xs:hidden block"
                        />
                        <p className="">
                          {post.post.bedroom} <span className="">Bed</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-1 md:gap-3 text-gray-800">
                        <Bath
                          size={20}
                          className="text-gray-600 xs:hidden block"
                        />
                        <p className="">
                          {post.post.bathroom}{" "}
                          <span className="">Bathroom</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-1 md:gap-3 text-gray-800">
                        <Ruler
                          size={20}
                          className="text-gray-600 xs:hidden block"
                        />
                        <p className="">
                          {post.post.unitArea
                            ? post.post.unitArea.toLocaleString()
                            : "1,243"}{" "}
                          <span className="">Sqft.</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-[1px] bg-slate-200" />

                  <div className="py-3 rounded-md w-full">
                    <QRCodeGenerator imageName={post.post.title} />
                  </div>
                </main>
              </div>

              <div className="border border-slate-200 bg-white rounded-2xl p-3 md:p-7">
                <header className="py-2">
                  <h2 className="text-3xl font-semibold px-3">Description</h2>
                </header>
                <div className="w-20 h-[1px] bg-slate-100 mt-5" />

                <div className="mt-8">
                  <p className="py-4 px-3">{post.post.description}</p>
                </div>
              </div>

              <div className="border border-slate-200 bg-white rounded-2xl p-7">
                <header className="py-2">
                  <h2 className="text-3xl font-semibold">Location</h2>
                  <p className="py-3 text-slate-500">{post.post.city}</p>
                </header>
                <div className="w-20 h-[1px] bg-slate-100 mt-4" />

                <div className="rounded-2xl overflow-hidden relative z-10 max-h-[400px] inset-0 mt-10">
                  <DynamicLocationMap
                    lat={post.post.latitude}
                    lng={post.post.longitude}
                  />
                </div>
              </div>

              <div className="border border-slate-200 bg-white rounded-2xl p-7">
                <header className="py-2">
                  <h2 className="text-3xl font-semibold">Amenities</h2>
                  <p className="py-3 text-slate-500">
                    About the property amenities
                  </p>
                </header>
                <div className="w-20 h-[1px] bg-slate-100 mt-4" />

                <div className="">
                  <div className="space-y-4 ">
                    <div className="interior">
                      <AmenitiesHeader icon={<Sofa />} header="Interior" />
                      <div className="grid md:grid-cols-2 gap-2 w-full">
                        <Amenities
                          amenities={amenities.roomDetails.appliances}
                          category="Appliance:"
                        />
                        <Amenities
                          amenities={amenities.roomDetails.floorCovering}
                          category="Floor:"
                        />
                        <Amenities
                          amenities={amenities.roomDetails.indoorFeatures}
                          category="Indoor:"
                        />
                        <Amenities
                          amenities={amenities.roomDetails.rooms}
                          category="Rooms:"
                        />
                      </div>
                    </div>

                    <div className="interior">
                      <AmenitiesHeader
                        icon={<Building />}
                        header="Building details"
                      />
                      <div className="grid md:grid-cols-2 gap-2 w-full">
                        <Amenities
                          amenities={
                            amenities.buildingDetails.buildingAmenities
                          }
                          category="Amenities:"
                        />
                        <Amenities
                          amenities={amenities.buildingDetails.exterior}
                          category="Exterior:"
                        />
                        <Amenities
                          amenities={amenities.buildingDetails.outdoorAmenities}
                          category="Outdoor:"
                        />
                        <Amenities
                          amenities={amenities.buildingDetails.parking}
                          category="Parking:"
                        />
                        <Amenities
                          amenities={amenities.buildingDetails.roof}
                          category="Roof:"
                        />
                        <Amenities
                          amenities={amenities.buildingDetails.view}
                          category="View:"
                        />
                      </div>
                    </div>

                    <div className="interior">
                      <AmenitiesHeader icon={<Cog />} header="Utilities" />
                      <div className="grid md:grid-cols-2 gap-2 w-full">
                        <Amenities
                          amenities={amenities.utilitiesDetails.coolingType}
                          category="Cooling Type:"
                        />
                        <Amenities
                          amenities={amenities.utilitiesDetails.heatingFuel}
                          category="Heating Fuel:"
                        />
                        <Amenities
                          amenities={amenities.utilitiesDetails.heatingType}
                          category="Heating Type"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="fixed z-30 bottom-0 right-3 lg:sticky lg:flex justify-center items-center lg:top-20 lg:basis-[30%] lg:shadow-lg lg:bg-white max-h-[200px] p-5 rounded-2xl">
              <div className="flex w-full flex-col gap-4 justify-center items-center">
                <div className="w-full">
                  <Button className="w-full text-left inline-flex gap-3 rounded-2xl bg-brand-primary">
                    <Mail size={16} />
                    Request a tour
                  </Button>
                </div>

                <div className="w-full">
                  <Button className="w-full rounded-2xl text-left inline-flex gap-3 bg-white lg:bg-transparent text-brand-primary border border-blue-700 hover:bg-blue-100">
                    <MessageCircle size={16} />
                    Chat {post.post.user && post.post.user?.username}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
