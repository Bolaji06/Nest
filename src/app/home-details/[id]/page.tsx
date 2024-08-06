import { getPost } from "@/utils/data";
import NavBar2 from "@/components/NavBar2";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Bath, Bed, Heart, Images, Ruler } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { TPost, TPostResult } from "@/lib/definitions";
import { convertToCurrency } from "@/lib/utils";
import { getUserSession } from "@/lib/getSession";
import LoginSignUp from "@/components/LoginSignUp";
import NavBar from "@/components/ui/NavBar";
import { Modal, SavedButton } from "@/components/Utilities";
import { cookies } from "next/headers";

export default async function HomeDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const data: TPostResult = await getPost(params.id);

  const session = await getUserSession();

  const token = cookies().get("token")?.value;
  //console.log(data.message.description)

  return (
    <>
      <section className="relative">
        <div>
          <NavBar />
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
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1">
                <div
                  className="w-full md:w-[400px] md:aspect-square  md:col-span-2 md:row-span-3
                md:rounded-tl-3xl md:rounded-bl-3xl relative"
                >
                  <Button className="absolute top-2 right-2 rounded-sm hover:bg-slate-200 bg-white/50 text-gray-900">
                    <Images size={14}/>
                    <p className="px-2">All Photos ({data.message.images.length})</p>
                  </Button>
                  <Image
                    src={data.message.images[0]}
                    alt="image"
                    width={1000}
                    height={1000}
                    className="object-cover w-full aspect-video md:aspect-square md:rounded-tl-3xl md:rounded-bl-3xl"
                  />
                </div>
                <div className="w-[200px] aspect-square hidden lg:block">
                  <Image
                    src={data.message.images[1]}
                    alt="image"
                    width={1000}
                    height={1000}
                    className="object-cover w-full aspect-square"
                  />
                </div>
                <div className="w-[200px] aspect-square md:rounded-tr-3xl hidden md:block">
                  <Image
                    src={data.message.images[2]}
                    alt="image"
                    width={1000}
                    height={1000}
                    className="object-cover w-full aspect-square md:rounded-tr-3xl"
                  />
                </div>
                <div className="w-[200px] aspect-square hidden lg:block">
                  <Image
                    src={data.message.images[3]}
                    alt="image"
                    width={1000}
                    height={1000}
                    className="object-cover w-full aspect-square"
                  />
                </div>
                <div className="md:w-[200px] aspect-square md:rounded-br-3xl hidden md:block">
                  <Image
                    src={data.message.images[4]}
                    alt="image"
                    width={1000}
                    height={1000}
                    className="object-cover w-full aspect-square md:rounded-br-3xl"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="lg:px-14 mt-12 md:mt-20 py-10 relative">
          <div className="flex justify-between gap-10">
            <div className="px-6 basis-full lg:basis-[70%]">
              <header className=" flex flex-col md:flex-row justify-between">
                <div>
                  <h2 className="text-xl lg:text-3xl font-semibold max-w-md">
                    {data.message.title}
                  </h2>
                  <p className="text-lg py-2">{data.message.address}</p>
                  <div className="flex gap-1 md:gap-3 items-center">
                    <div className="inline-flex items-center gap-1 py-3">
                      <Bed className="text-slate-500" />
                      <p className="px-1 text-sm">{data.message.bedroom} Bed</p>
                      <Bath className="text-slate-500" />
                      <p className="px-1 text-sm">
                        {data.message.bathroom} Bath
                      </p>

                      <Ruler className="text-slate-500" />
                      <p className="px-1 text-sm">
                        {data.message.unitArea.toLocaleString() || 2500} sqft
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="font-semibold text-xl lg:text-3xl">
                    {convertToCurrency(data.message.price)}
                  </h2>
                  <div>
                    <SavedButton
                      id={data.message?.id}
                      isSaved={data.message?.isSaved}
                      session={session}
                      token={token}
                    />
                  </div>
                </div>
              </header>

              <div className="mt-6">
                <p className="text-sm text-slate-500 py-2">Posted By:</p>
                <div className="flex gap-2 items-center">
                  <Image
                    src={data.message.user.avatar}
                    width={100}
                    height={100}
                    alt="user"
                    className="w-12 aspect-square rounded-full"
                  />
                  <div>
                    <p className="font-semibold">
                      {data.message.user.username}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-semibold py-3">Description</h2>

                <div
                  className="w-full desc"
                  dangerouslySetInnerHTML={{ __html: data.message.description }}
                ></div>
              </div>
            </div>

            <div className="lg:sticky fixed bottom-0  w-full basis-[30%] bg-white lg:shadow-none shadow-2xl">
              <div className="lg:border border-slate-200 rounded-md p-5 gap-4 w-full flex lg:flex-col">
                <Button className="bg-brand-secondary w-full font-semibold hover:bg-transparent hover:text-brand-secondary border border-brand-secondary">
                  Book a Tour
                </Button>

                <Button className="bg-transparent border w-full font-semibold text-blue-950 hover:text-white border-blue-950">
                  Schedule Info
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
