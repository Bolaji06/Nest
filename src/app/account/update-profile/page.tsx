import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import { userType } from "@/utils/links";
import { getUser } from "@/actions/userActions";
import { getUserSession } from "@/lib/getSession";
import { IUserProfile, IUserProfileData } from "@/lib/definitions";
import { FormButton } from "@/components/FormButton";
export default async function ProfileUpdatePage() {
  const session = await getUserSession();
  const id = session?.id as string;
  const user: IUserProfile = await getUser(id);

  //console.log(user.about);
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

        <section className="mt-4 py-3">
          <form action="" className="space-y-3">
            <div>
              <label
                htmlFor="firstName"
                className="text-sm mb-3 text-slate-400"
              >
                First name
              </label>
              <Input
                id="firstName"
                name="firstName"
                defaultValue={user.firstName}
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="text-sm mb-3 text-slate-400">
                Last name
              </label>
              <Input
                id="lastName"
                name="lastName"
                defaultValue={user.lastName}
                placeholder="Enter your last name"
              />
            </div>
            <div>
              <label htmlFor="username" className="text-sm mb-3 text-slate-400">
                Username
              </label>
              <Input
                id="username"
                name="username"
                defaultValue={user.username}
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label htmlFor="userType" className="text-sm mb-3 text-slate-400">
                User type
              </label>
              <select
                defaultValue={user.userType}
                name="userType"
                className="w-full border capitalize focus-visible:outline-none focus-visible:ring-2 ring-offset-blue-500 text-sm focus-visible:ring-offset-2 rounded-md py-2 px-2"
              >
                {userType.map((type) => {
                  return (
                    <option key={type.value} value={type.value}>
                      {type.text}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="text-sm mb-3 text-slate-400"
              >
                Phone number
              </label>
              <Input
                id="phoneNumber"
                name="phone"
                defaultValue={user.phone}
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label htmlFor="location" className="text-sm mb-3 text-slate-400">
                Location
              </label>
              <Input
                id="location"
                name="location"
                defaultValue={user.location}
                placeholder="Enter your location"
              />
            </div>
            <div>
              <label htmlFor="about" className="text-sm mb-3 text-slate-400">
                About
              </label>
              <textarea
                id="about"
                name="about"
                defaultValue={user.about}
                placeholder="About you..."
                className="w-full border capitalize focus-visible:outline-none focus-visible:ring-2 ring-offset-blue-500 text-sm focus-visible:ring-offset-2 rounded-md py-2 px-3"
              />
            </div>
            <div className="flex gap-4">
              <Button className="bg-brand-primary">Update</Button>
              <Button className="bg-red-500">Cancel</Button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
