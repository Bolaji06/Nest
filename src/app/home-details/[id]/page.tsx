import { getPost } from "@/utils/data";
import NavBar2 from "@/components/NavBar2";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Bath, Bed, Ruler } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { TPost, TPostResult } from "@/lib/definitions";
import { convertToCurrency } from "@/lib/utils";

export default async function HomeDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const data: TPostResult = await getPost(params.id);

  console.log(data);

  return (
    <>
      <section>
        <div>
          <NavBar2 />
        </div>

        <div className="flex justify-center items-center relative top-16 px-4">
          <div>
            <section>
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
              <div className="grid grid-cols-4 gap-1">
                <div
                  className="w-full h-full col-span-2 row-span-3 
                rounded-tl-3xl rounded-bl-3xl"
                >
                  <Image
                    src={data.message.images[0]}
                    alt="image"
                    width={1000}
                    height={1000}
                    className="object-cover w-full aspect-square rounded-tl-3xl rounded-bl-3xl"
                  />
                </div>
                <div className="w-[200px] aspect-square">
                  <Image
                    src={data.message.images[1]}
                    alt="image"
                    width={1000}
                    height={1000}
                    className="object-cover w-full aspect-square"
                  />
                </div>
                <div className="w-[200px] aspect-square rounded-tr-3xl">
                  <Image
                    src={data.message.images[2]}
                    alt="image"
                    width={1000}
                    height={1000}
                    className="object-cover w-full aspect-square rounded-tr-3xl"
                  />
                </div>
                <div className="w-[200px] aspect-square">
                  <Image
                    src={data.message.images[3]}
                    alt="image"
                    width={1000}
                    height={1000}
                    className="object-cover w-full aspect-square"
                  />
                </div>
                <div className="w-[200px] aspect-square rounded-br-3xl">
                  <Image
                    src={data.message.images[4]}
                    alt="image"
                    width={1000}
                    height={1000}
                    className="object-cover w-full aspect-square rounded-tr-3xl rounded-br-3xl"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="px-4 lg:px-14 mt-20 py-10 relative">
          <div className="flex justify-between gap-10">
            <div className="basis-[70%]">
              <header className="flex justify-between">
                <div>
                  <h2 className="text-3xl font-semibold max-w-md">
                    {data.message.title}
                  </h2>
                  <p className="text-lg py-2">{data.message.address}</p>
                  <div className="flex gap-3 items-center">
                    <div className="inline-flex items-center gap-1 py-3">
                      <Bed className="text-slate-500"/>
                      <p className="px-1">{data.message.bedroom} Bed</p>
                      <Bath className="text-slate-500"/>
                      <p className="px-1">{data.message.bathroom} Bath</p>
                      <Ruler className="text-slate-500"/>
                      <p className="px-1">5000 sqft</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="font-semibold text-3xl">
                    {convertToCurrency(data.message.price)}
                  </h2>
                </div>
              </header>

              <div>
                <p>Posted By:</p>
                <div className="flex gap-2">
                  <Image src={data.user.avatar}
                  width={100}
                  height={100}
                  alt="user"
                  className=""/>

                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-semibold py-3">Description</h2>

                <div
                  className="w-full"
                  dangerouslySetInnerHTML={{ __html: data.message.description }}
                ></div>
              </div>
            </div>

            <div className="sticky w-full basis-[30%]">
              <div className="p-4 border w-full space-y-2 flex flex-col rounded-lg bg-white shadow-xl">
                <form action="" className="space-y-3">
                  <div>
                    <label htmlFor="phone" className="text-sm">
                      Phone number
                    </label>
                    <Input />
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-sm">
                      Phone number
                    </label>
                    <Input />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="phone" className="text-sm">
                      Message
                    </label>
                    <textarea
                      cols={3}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 ring-offset-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-brand-secondary
                   hover:bg-transparent hover:text-brand-secondary hover:border border-brand-secondary"
                  >
                    Submit
                  </Button>

                  <div className="flex items-center gap-2">
                    <Input
                      type="checkbox"
                      className="w-3 h-3 checked:bg-brand-secondary"
                    />
                    <label htmlFor="approve" className="text-xs text-slate-500">
                      I approve an email been sent to my inbox and receive any
                      other notification
                    </label>
                  </div>
                </form>
                <div>
                  <p className="text-xs text-slate-500">
                    By pressing Request Info, you agree that Nest and real
                    estate professionals may contact you via phone/text about
                    your inquiry, which may involve the use of automated means.
                    You are not required to consent as a condition of purchasing
                    any property, goods or services. Message/data rates may
                    apply. You also agree to our Terms of Use Nest does not
                    endorse any real estate professionals
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
