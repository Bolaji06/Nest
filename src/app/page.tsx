import ExploreGrid from "@/components/ExploreGrid";
import FooterHero from "@/components/FooterHero";

import HeroSection from "@/components/HeroSection";
import LoginSignUp from "@/components/LoginSignUp";
import Outlet from "@/components/AuthOutlet";
import NavBar from "@/components/ui/NavBar";
import Image from "next/image";
import { Suspense } from "react";
import { getUserSession } from "@/lib/getSession";
import { getAllPosts } from "@/utils/data";
import Link from "next/link";
import { PostCardSkeleton } from "@/components/AppSkeleton";
import PostCard from "@/components/ui/PostCard";
import { TPost } from "@/lib/definitions";

export default async function Home() {
  const response = await getAllPosts();

  const firstTen = response?.message?.slice(1, 9);

  return (
    <main className="">
      <NavBar />

      <div className="relative top-16">
        <Suspense fallback={<p>Loading...</p>}>
          <div className="px-4">
            <HeroSection />
          </div>
        </Suspense>
        <ExploreGrid />

        <div className="my-10 px-4">
          <header className="py-3">
            <h2 className="text-2xl py-5 font-semibold">
              Latest homes on Nest
            </h2>
          </header>

          <section className="grid-container gap-3 ">
            {firstTen?.map((post: TPost) => {
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
            })}
          </section>
          <div className="flex justify-center items-center mt-4">
            <Link
              href={"/search"}
              className="underline p-3 text-sm text-center text-brand-primary font-semibold"
            >
              View all
            </Link>
          </div>
        </div>
        <FooterHero />
      </div>
    </main>
  );
}
