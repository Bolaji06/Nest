import { PostCardSkeleton } from "@/components/AppSkeleton";
import PostCard from "@/components/ui/PostCard";
import { TPost } from "@/lib/definitions";
import { getAllPosts } from "@/utils/data";
import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
export default async function AllPost() {
  const response = await getAllPosts();

  return (
    <>
      <main>
        <header className="text-2xl font-semibold py-2">All Post</header>

      <section className="grid-container gap-3 ">
          {response?.message.map((post: TPost) => {
            return (
              <Suspense key={post.id} fallback={<PostCardSkeleton />}>
                <Link
                href={'/home-details'}>
                  <PostCard
                    image={post.images[0]}
                    title={post.title}
                    bathroom={post.bathroom}
                    bedroom={post.bedroom}
                    price={post.price}
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
