import { getUser, getUsers } from "@/actions/userActions";
import ProfileComponent from "@/components/ProfileComponent";
import { Button } from "@/components/ui/button";
import { getUserSession } from "@/lib/getSession";
import Link from "next/link";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "User account | Nest.com"
}
export default async function ProfilePage() {
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
      <main className="">
        <ProfileComponent data={data} />
      </main>
    </>
  );
}
