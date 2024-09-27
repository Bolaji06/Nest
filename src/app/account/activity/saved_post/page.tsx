
import { PostCardSkeleton } from "@/components/AppSkeleton";
import PostCard from "@/components/ui/PostCard";
import { TPost, TPostAmenities, TPostResult } from "@/lib/definitions";
import { getAllPosts } from "@/utils/data";
import { Suspense } from "react";
import { ISavedPost } from "@/lib/definitions";
import { getAllSavedPost, getPost } from "@/utils/data"
import { Metadata } from "next"
import Link from "next/link";
import ActivityComponent from "@/components/ActivityComponent";

export const metadata: Metadata = {
    title: "Saved Post | Nest.com"
}
export default async function SavedPost(){
    const data: ISavedPost = await getAllSavedPost();

    const savedList = await Promise.all(data.message?.map(async (post) => {
       return await getPost(post.postId)
    }))

    //console.log(savedList)

    

    return (
        <>
            <main>
            <header className="">
                <ActivityComponent />
              </header>
            <section className="grid-container gap-3 ">
          { savedList.length ? savedList.map((post: TPostAmenities) => {
            return (
              <Suspense key={post.message.post.id} fallback={<PostCardSkeleton />}>
                <Link href={`/home-details/${post.message.post.id}`}>
                  <PostCard
                    image={post.message.post.images[0]}
                    title={post.message.post.title}
                    bathroom={post.message.post.bathroom}
                    bedroom={post.message.post.bedroom}
                    price={post.message.post.price}
                    unitArea={post.message.post.unitArea ? post.message.post.unitArea.toLocaleString() : 1232}
                  />
                </Link>
              </Suspense>
            );
          }): <p className="text-slate-400 text-2xl text-center">No saved post</p>}
        </section>
            </main>
        </>
    )
}