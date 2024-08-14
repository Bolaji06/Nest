import PostCard from "@/components/ui/PostCard";
import FooterHero from "@/components/FooterHero";
import { getSearch } from "@/utils/data";
import { Suspense } from "react";
import { PostCardSkeleton } from "@/components/AppSkeleton";
import { TPost } from "@/lib/definitions";
//import { Link } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import not_found from "../../../public/not_found.gif";
import NavBar2 from "@/components/NavBar2";
import { Button } from "@/components/ui/button";
import FilterChips from "@/components/FilterChips";
import { Metadata, ResolvingMetadata } from "next";
import MapComponent from "@/components/MapComponent";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const data = await getSearch(searchParams);

  return {
    title: data.message[0]?.title + " | Next Homes",
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  //console.log(searchParams)
  const data = await getSearch(searchParams);

  console.log(data);

  return (
    <>
      <div className="">
        <NavBar2 />
      </div>
      <section className="">
        <div className="pt-20 fixed bg-white w-full pb-3 px-8">
          <FilterChips />
        </div>
        {/* <header className="px-4 pt-36">
          <div className="pb-3">
            {data.message.length ? (
              <h1 className="text-lg text-black">Search Result for: </h1>
            ) : (
              ""
            )}
          </div>
        </header> */}
        <section className="flex overflow-hidden h-screen gap-1 pt-32">
        <section className="grid-container gap-3 basis-[60%] py-4 px-6 shadow-md">
          {!data.message.length ? (
            <div className="flex justify-center items-center align-middle">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">
                  {"We couldn't find your search term."}
                </h1>
                <Image
                  src={not_found}
                  alt="not found gif"
                  width={1000}
                  height={1000}
                  className="w-full"
                />
              </div>
            </div>
          ) : (
          <div className="min-h-full grid-container gap-3 overflow-y-auto">
            
            {data?.message.map((post: TPost) => {
              return (
                
                <Suspense key={post.id} fallback={<PostCardSkeleton />}>
                  <Link href={`/home-details/${post.id}`}>
                    <PostCard
                      image={post.images[0]}
                      title={post.title}
                      bathroom={post.bathroom}
                      bedroom={post.bedroom}
                      price={post.price}
                      unitArea={
                        post.unitArea ? post.unitArea.toLocaleString() : 1232
                      }
                    />
                  </Link>
                </Suspense>
                
                
              );
            })
          }</div>)}
        </section>

        {data.message.length && <section className="map basis-[40%] ">
          <Suspense fallback={<p>Loading...</p>}>
            <MapComponent data={data.message}/>
          </Suspense>
          
        </section>}
        </section>
      </section>
    </>
  );
}
