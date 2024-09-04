import { profileSideLink } from "@/utils/links";
import Link from "next/link";

import { getUser, getUsers } from "@/actions/userActions";
import ProfileComponent from "@/components/ProfileComponent";
import { Button } from "@/components/ui/button";
import { getUserSession } from "@/lib/getSession";
import ActivityLinks from "./ui/actitvityLinks";

export default async function ActivityComponent() {
  const session = await getUserSession();

  if (!session) {
    return (
      <div className="relative">
        <div className="flex justify-center items-center flex-col gap-3">
          <h1>Session Expired</h1>
          <p>Login to renew your session</p>
          <Button asChild>
            <Link href={"/"}>Login</Link>
          </Button>
        </div>
      </div>
    );
  }
  const data = await getUser(session?.id);

  return (
    <>
      <section className="mb-5">
        <header>
          <h2 className="text-2xl font-semibold py-1">
            {`${data.username}'s`} Listing
          </h2>
          <p className="py-1 text-gray-500 tracking-wide">
            Here is {data.username} page which includes all listings and
            activity
          </p>
        </header>

        <div className="w-14 h-[1px] bg-slate-100 mt-5" />

        <ActivityLinks />
      </section>
    </>
  );
}
