import PostCard from "@/components/ui/PostCard";
import FooterHero from "@/components/FooterHero";
import { getSearch } from "@/utils/data";

export default async function SearchPage({ searchParams }: { searchParams: { [key: string]: string} }){
   console.log(searchParams);

   const data = await getSearch(searchParams);
   console.log(data)


    return (
        <>
            <section className="px-8">
                <header>
                    <div className="pb-3">
                        <h1 className="text-lg text-black">Search Result for: </h1>
                    </div>
                </header>
                <section className="grid-container gap-3 grid-cols-4">
                    <PostCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                </section>
            </section>
            <FooterHero />
        </>
    )
}