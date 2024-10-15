"use client";

import { Button } from "@/components/ui/button";
import { TPostAmenities } from "@/lib/definitions";
import { ArrowLeft, Loader2 } from "lucide-react";

import { redirect, useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { FormButton } from "./FormButton";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { updatePost } from "@/actions/postActions";
import UpdateUserForm from "./UpdateUserForm";
import { useToast } from "./ui/use-toast";
import { revalidateTag } from "next/cache";
import { updatePostSchema } from "@/utils/validation";
import { ZodError } from "zod";

interface EditPostProps {
  post: TPostAmenities;
  tokenId: string;
}
interface IUpdateResponse {
  success: boolean;
  message: string;
}
export default function EditPost({ post, tokenId }: EditPostProps) {
  const [formInput, setFormInput] = useState({
    title: post.message.post.title,
    description: post.message.post.description,
    price: post.message.post.price,
    bathroom: post.message.post.bathroom,
    bedroom: post.message.post.bedroom,
  });
  const [updateResponse, setUpdateResponse] = useState<IUpdateResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<any | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!tokenId) {
      toast({
        title: "Session expires",
        description: "Session expires kindly login",
      });
      router.back();
    }
    if (updateResponse && updateResponse.success) {
      toast({
        title: "Success!",
        description: "Post updated successfully",
      });
      router.back();
    }
  }, [tokenId, updateResponse?.success]);

  function handleFormChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.currentTarget;
    setFormInput((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function onSubmitUpdatePost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    async function handleUpdatePost() {
      setIsLoading(false);
      try {
        setIsLoading(true);
        const res = await updatePost(formInput, post.message.post.id);
        setUpdateResponse(res);
      } catch (error) {
        
        setFormError(error)
      } finally {
        setIsLoading(false);
      }
    }
    handleUpdatePost();
  }
  console.log(formError?.Error);

  return (
    <>
      <section>
        <header>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.back()}
              className="w-12 h-12 aspect-square bg-transparent rounded-full border hover:bg-transparent
              hover:bg-slate-100"
            >
              <ArrowLeft size={22} color="black" />
            </Button>

            <h2 className="font-semibold text-xl">Go back</h2>
          </div>

          <div className="py-4 max-w-[400px]">
            <p className="text-gray-400">
              You are about to edit{" "}
              <span className="text-gray-600 font-medium">
                {post.message.post.title}
              </span>{" "}
              on Nest all changes will be updated once review
            </p>
          </div>
        </header>

        <div>
          <form onSubmit={onSubmitUpdatePost} className="space-y-3">
            <div>
              <label className="text-sm">Title</label>
              <Input
                value={formInput.title}
                onChange={handleFormChange}
                name="title"
              />
            </div>

            <div>
              <label className="text-sm">Price</label>
              <Input
                value={formInput.price}
                onChange={handleFormChange}
                name="price"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm">Bedroom</label>
                <Input
                  value={formInput.bedroom}
                  onChange={handleFormChange}
                  name="bedroom"
                />
              </div>
              <div>
                <label className="text-sm">Bathroom</label>
                <Input
                  value={formInput.bathroom}
                  onChange={handleFormChange}
                  name="bathroom"
                />
              </div>
            </div>

            <div>
              <label className="text-sm">Description</label>
              <textarea
                value={formInput.description}
                name="description"
                onChange={handleFormChange}
                className="w-full h-20 p-4 resize-none rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 ring-offset-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter listing description"
              />
            </div>
            <Button
              type="submit"
              className="bg-brand-primary hover:bg-blue-800 flex items-center gap-3"
            >
              Update
              {isLoading && (
                <Loader2 className="animate-spin text-white" size={18} />
              )}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
