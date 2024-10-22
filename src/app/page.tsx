import ExploreGrid from "@/components/ExploreGrid";
import FooterHero from "@/components/FooterHero";

import HeroSection from "@/components/HeroSection";

import NavBar from "@/components/ui/NavBar";
import { Suspense } from "react";
import { getAllPosts } from "@/utils/data";
import Link from "next/link";
import { PostCardSkeleton } from "@/components/Loader/LoadersSkeleton";
import PostCard from "@/components/ui/PostCard";
import { TPost } from "@/lib/definitions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Nest: Real Estate, Apartment for Sale, House for Sale, Homes for Rent Property for Sale',
  description: 'Nest: Search house for sale, home for rent, listing for all homes, Marketplace for house sale and home for rent',
  keywords: [
    'Home',
    'House',
    'Buy',
    'Rent',
    'Renter',
    'Real Estate',
    'Property',
    'Building homes',
    'Building house',
  ],
  openGraph: {
    url: 'https://nest-black-five.vercel.app',
    type: 'website',
    title: 'Real Estate, House, Homes, Buy house, Rent homes, Home building',
    description: 'Nest: Marketplace for homes and houses, Buy house, Rent homes',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Nest: Real Estate'
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy house, Rent home, Marketplace for house | Nest - Real Estate",
    description: 'Nest: Search house for sale, home for rent, listing for all homes, Marketplace for house sale and home for rent',
    creator: 'bj.dev',
    site: 'bj.dev',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Nest: Real Estate'
      }
    ]
  },
  alternates: {
    canonical: 'https://nest-black-five.vercel.app'
  }
}

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

          <section className="grid-container gap-3 scroll-mt-20 scroll-smooth" id="buy">
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
