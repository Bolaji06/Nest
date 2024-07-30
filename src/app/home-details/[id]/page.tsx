import { getPost } from "@/utils/data";
import NavBar2 from "@/components/NavBar2";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function HomeDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getPost(params.id);

  //console.log(data);

  return (
    <>
      <section>
        <div>
          <NavBar2 />
        </div>

        <div className="flex justify-center items-center relative top-20">
          <div>
            <header>
              <Button
                asChild
                className="flex gap-1 items-center text-brand-primary hover:bg-transparent bg-transparent font-semibold hover:underline text-left"
              >
                <Link href={"/search"} className="">
                  <ArrowLeft size={18} />
                  Back to Search
                </Link>
              </Button>
            </header>

            <section>
                <div className="grid grid-cols-4 gap-1">
                    <div className="w-full h-full bg-slate-600 col-span-2 row-span-3"></div>
                    <div className="w-20 h-30 bg-slate-600"></div>
                    <div className="w-20 h-20 bg-slate-600"></div>
                    <div className="w-20 h-20 bg-slate-600"></div>
                    <div className="w-20 h-20 bg-slate-600"></div>

                </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
