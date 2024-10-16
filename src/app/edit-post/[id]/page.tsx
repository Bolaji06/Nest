import EditPost from "@/components/EditPost";
import { getUserSession } from "@/lib/getSession";
import { getPost } from "@/utils/data";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  const session = await getUserSession();
  const tokenId = session?.id as string

  return (
    <>
      <section className="border rounded-3xl p-6 ">
        <EditPost 
        post={post}
        tokenId={tokenId}/>
      </section>
    </>
  );
}
