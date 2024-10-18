import { PostCardSkeleton } from "@/components/Loader/LoadersSkeleton";
import PostCard from "@/components/ui/PostCard";
import { TPost } from "@/lib/definitions";
import { getAllPosts, getUserPost } from "@/utils/data";
import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { Metadata } from "next";
import ActivityComponent from "@/components/ActivityComponent";
import { getUserSession } from "@/lib/getSession";

export const metadata: Metadata = {
  title: "User Posts | Nest.com",
  description: "List of all user posts listing on Next Homes",
};
export default async function AllPost() {
  const session = await getUserSession();
  const tokenId = session?.id as string;
  const data = await getUserPost(tokenId);

  return (
    <>
      <main>
        <header className="">
          <ActivityComponent />
        </header>
        <section className="grid-container gap-3 ">
          {data?.userPosts?.length ? (
            data?.userPosts?.map((post: TPost) => {
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
          ) : (
            <p className="text-slate-400 text-center text-2xl">No post yet!</p>
          )}
        </section>
      </main>
    </>
  );
}
