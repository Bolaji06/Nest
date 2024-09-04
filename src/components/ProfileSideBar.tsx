
import { getUserSession } from "@/lib/getSession";
import ClientProfileSideBar from "./ClientProfileSideBar";
import { getUser } from "@/actions/userActions";
import { cookies } from "next/headers";
export default async function ProfileSideBar() {
  const session = await getUserSession();

  if (!session){return null}
  const data = await getUser(session?.id);
  const token = cookies().get("token")?.value;

  //sm:w-[200px] md:w-[300px]

  return (
    <>
     
      <aside className="w-full border rounded-3xl pt-2 sticky top-20">
       <ClientProfileSideBar
        data={data}
        />
        
      </aside>
    </>
  );
}
