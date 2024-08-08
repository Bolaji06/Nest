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


export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  //console.log(searchParams)
  const data = await getSearch(searchParams);

  //console.log(data);

  return (
    <>
      <div className="">
        <NavBar2 />

      </div>
      <section className="px-8">
      <div className="pt-20">
          <FilterChips />
        </div>
        <header className="py-1">
          <div className="pb-3">
            {data.message.length ? (
              <h1 className="text-lg text-black">Search Result for: </h1>
            ) : (
              ""
            )}
          </div>
        </header>
        <section className="grid-container gap-3 ">
          {!data.message.length ? (
            <div className="flex justify-center items-center align-middle">
              <div className="space-y-2">
                <Image
                  src={not_found}
                  alt="not found gif"
                  width={1000}
                  height={1000}
                  className="w-full"
                />

                <h1 className="text-3xl font-bold">
                  {"We couldn't find your search term."}
                </h1>
              </div>
            </div>
          ) : (
            data?.message.map((post: TPost) => {
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
          )}
        </section>
      </section>
      <FooterHero />
    </>
  );
}
