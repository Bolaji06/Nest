import { PostCardSkeleton } from "@/components/AppSkeleton";
import PostCard from "@/components/ui/PostCard";
import { TPost } from "@/lib/definitions";
import { getAllPosts } from "@/utils/data";
import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";
export default async function AllPost() {
 noStore()
  const response = await getAllPosts();

 // await new Promise(resolve => setTimeout(resolve, 4000));

  return (
    <>
      <main>
        <header className="text-2xl font-semibold py-2">All Post</header>

      <section className="grid-container gap-3 ">
          {response?.message.map((post: TPost) => {
            return (
              <Suspense key={post.id} fallback={<PostCardSkeleton />}>
                <PostCard
                  image={post.images[0]}
                  title={post.title}
                  bathroom={post.bathroom}
                  bedroom={post.bedroom}
                  price={post.price}
                />
              </Suspense>
            );
          })}
        </section>
      </main>
    </>
  );
}
