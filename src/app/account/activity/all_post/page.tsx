import { PostCardSkeleton } from "@/components/AppSkeleton";
import PostCard from "@/components/ui/PostCard";
import { TPost } from "@/lib/definitions";
import { getAllPosts } from "@/utils/data";
import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { Metadata } from "next";
import ActivityComponent from "@/components/ActivityComponent";

export const metadata: Metadata = {
  title: "User Posts | Nest.com",
  description: "List of all user posts listing on Next Homes"

}
export default async function AllPost() {
  const response = await getAllPosts();

  return (
    <>
      <main>
      <header className="">
                <ActivityComponent />
              </header>
        <section className="grid-container gap-3 ">
          {response?.message.map((post: TPost) => {
            return (
              <Suspense key={post.id} fallback={<PostCardSkeleton />}>
                <Link href={`/home-details/${post.id}`}>
                  <PostCard
                    image={post.images[0]}
                    title={post.title}
                    bathroom={post.bathroom}
                    bedroom={post.bedroom}
                    price={post.price}
                    unitArea={post.unitArea ? post.unitArea.toLocaleString() : 1232}
                  />
                </Link>
              </Suspense>
            );
          })}
        </section>
      </main>
    </>
  );
}
