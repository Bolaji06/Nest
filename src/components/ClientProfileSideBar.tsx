"use client";

import { IUserProfileData } from "@/lib/definitions";
import { profileSideLink } from "@/utils/links";
import clsx from "clsx";
import { Loader2, Pencil, UserCircle } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { changeUserAvatar } from "@/actions/userActions";
import { uploadAvatarToFirebase } from "@/lib/firebaseStorage";
import { Button } from "./ui/button";

let USER_ENDPOINT = "";

if (process.env.NODE_ENV === "development") {
  USER_ENDPOINT = `${process.env.NEXT_PUBLIC_LOCAL_API_USER}`;
} else if (process.env.NODE_ENV === "production") {
  USER_ENDPOINT = `${process.env.NEXT_PUBLIC_URL_USER}`;
}
export default function ClientProfileSideBar({ data }: IUserProfileData) {
  const pathname = usePathname();
  const [inputAvatar, setInputAvatar] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isChangeAvatarLoading, setIsChangeAvatarLoading] =
    useState<boolean>(false);

  function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const imageFile = e.target.files[0];

      if (!imageFile.type.startsWith("image/")) {
        setInputAvatar(null);
        setImageError("file type should be an image");
      } else if (imageFile.size > 2 * 1024 * 1024) {
        setInputAvatar(null);
        setImageError("image file exceeds 2MB");
      } else {
        uploadAvatarToFirebase(imageFile)
          .then((fileUrl) => {
            if (fileUrl) {
              setInputAvatar(fileUrl);
            }

            setImageError(null);
          })
          .catch((err) => {
            setInputAvatar(null);
            setImageError("Failed to upload avatar");
          });
      }
    }
  }

  useEffect(() => {
    async function uploadAvatar() {
      if (inputAvatar) {
        try {
          setIsChangeAvatarLoading(true);
          const apiData = await changeUserAvatar(data?.id, inputAvatar);
          return apiData;
        } catch (err) {
          console.log(err);
        } finally {
          setIsChangeAvatarLoading(false);
        }
      }
    }
    uploadAvatar();
  }, [inputAvatar]);

  return (
    <>
      <div className="">
        <div
          className="flex justify-center text-center items-center flex-col gap-3 w-full
                 py-4"
        >
          {/* Profile Image and Name  */}
          <div className="relative">
            {data.avatar ? (
              <Image
                src={data.avatar}
                alt="user profile image"
                width={100}
                height={100}
                className="rounded-full border border-blue-400 aspect-square w-28"
              />
            ) : (
              <UserCircle size={90} strokeWidth={0.7} />
            )}
            <label
              htmlFor="avatar"
              className="absolute bottom-2 -right-2 bg-slate-200 w-10 rounded-full aspect-square
            flex justify-center items-center cursor-pointer"
            >
              {isChangeAvatarLoading ? (
                <Loader2 size={16} className="text-blue-600 animate-spin" />
              ) : (
                <Pencil size={18} color="black" />
              )}
              <Input
                onChange={handleAvatarChange}
                accept="image/*"
                name="avatar"
                type="file"
                hidden
                id="avatar"
                disabled={isChangeAvatarLoading}
                aria-hidden
                className="hidden"
              />
            </label>
            <p className="text-sm text-red-500">{imageError}</p>
          </div>

          <div>
            <p className="text-center font-bold">{data?.username}</p>
            <p className="text-sm capitalize">{data.userType}</p>
          </div>

          <div className="">
            <Button className="bg-transparent text-brand-primary hover:bg-transparent underline">Edit</Button>
          </div>
        </div>

        {/* <div>
          <ul>
            {profileSideLink.map((item) => {
              return (
                <li
                  key={item.name}
                  className="text-gray-500 flex items-center gap-3 p-3 border-y hover:bg-blue-50/50"
                >
                  <item.icon
                    className={`${clsx({
                      "font-medium text-brand-primary": item.link === pathname,
                    })}`}
                  />
                  <Link
                    href={item.link}
                    className={`${clsx({
                      "font-medium text-brand-primary": item.link === pathname,
                    })} w-full`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div> */}
      </div>
    </>
  );
}
