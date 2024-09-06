import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import { getUser, updateUser } from "@/actions/userActions";
import { getUserSession } from "@/lib/getSession";
import { IUserProfile, IUserProfileData } from "@/lib/definitions";
import { FormButton } from "@/components/FormButton";
import UpdateUserForm from "@/components/UpdateUserForm";
export default async function ProfileUpdatePage() {
  const session = await getUserSession();
  const id = session?.id as string;
  const user: IUserProfile = await getUser(id);


  return (
    <>
      <main className="">
        <header className="inline-flex gap-5 items-center">
          <Button
            asChild
            className="bg-transparent hover:bg-transparent w-12 h-12 aspect-square hover:bg-slate-100 rounded-full"
          >
            <Link href={"/account/activity/all_post"}>
              <ArrowLeft size={20} className="text-gray-700" />
            </Link>
          </Button>
          <div>
            <h2 className="text-2xl text-gray-900 font-semibold">
              Update Account Information
            </h2>
          </div>
        </header>

        <section>
          <UpdateUserForm user={user}/>
        </section>

        
      </main>
    </>
  );
}
