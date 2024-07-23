"use client";

import { ImageUp, X } from "lucide-react";
import { Input } from "./ui/input";

import Image from "next/image";
import {
  ChangeEvent,
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { uploadPostImage } from "@/lib/firebaseStorage";
import clsx from "clsx";
import { fileSizeConversion } from "@/lib/utils";
import { useDropzone } from "react-dropzone";

interface UploadFilesProps {
  setPostImageUrls: (curState: string[]) => void;
}
interface FileUpload {
  url: string;
  name: string;
  size: number;
}
export interface UploadFilesHandle {
  uploadImage: () => Promise<string[]>
}
// using ref
export default forwardRef(function UploadFiles(props: UploadFilesProps, ref: Ref<UploadFilesHandle>) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileList, setFileList] = useState<FileUpload[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);

  // process files
  function processFiles(files: File[]) {
    const validatedFiles: File[] = [];

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        setFileError("File should be an image");
        return;
      } else if (file.size > 1024 * 1024 * 25) {
        setFileError("File max size is 25MB");
        return;
      } else {
        validatedFiles.push(file);
      }
    });
    if (validatedFiles.length > 0) {
      setSelectedFiles((curState) => [...curState, ...validatedFiles]);
      setFileError(null);
    }
  }

  // handle file change
  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const inputFiles = Array.from(e.target.files || []);
    processFiles(inputFiles);
  }

  // use dropzone for drag and drop of files
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files: File[]) => {
      processFiles(files);
    },
    multiple: true,
    noClick: true, // avoid duplicate opening of file ui
  });

  useEffect(() => {
    function stagingFiles() {
      if (selectedFiles.length) {
        const imageFile = selectedFiles.map((file: File) => {
          return {
            url: URL.createObjectURL(file),
            name: file.name,
            size: file.size,
          };
        });
        setFileList((curState) => {
          const newImageFile = imageFile.filter(
            (file) => !curState.some((item) => item.name === file.name)
          );
          return [...curState, ...newImageFile];
        });
      }
    }
    stagingFiles();
  }, [selectedFiles]);

  function removeFromList(item: number) {
    if (!fileList.length) {
      console.log("No file found");
    }

    setFileList((curState) => {
      return curState.filter((_, index) => index !== item);
    });
  }

  // how to use a function from a child in the child component
  // using useImperativeHandle hook
  useImperativeHandle(ref, () => ({
    async uploadImage(): Promise<string[]> {
      const imageUrls = await Promise.all(
        selectedFiles.map((file) => {
          return uploadPostImage(file);
        })
      );
      return imageUrls;
    }
  }));

  return (
    <>
      <main>
        <section className="border rounded-md py-4 px-10">
          {/*  upload images and images should be draggable */}
          <header
            {...getRootProps()}
            className={`border-2 bg-blue-50 border-dashed border-blue-500 rounded-sm
              p-10 ${clsx({
                "border-dashed border-green-500 bg-green-100": isDragActive,
              })}`}
          >
            <div className="flex justify-center items-center">
              <div className="flex justify-center items-center flex-col space-y-4">
                <div>
                  <ImageUp size={60} color="gray" className="text-center" />
                </div>

                <div className="flex justify-center gap-2 items-center font-semibold">
                  <p>Drag and drop images or</p>
                  <label className="underline cursor-pointer">
                    Choose a file
                    <Input
                      {...getInputProps()}
                      accept="image/*"
                      multiple
                      className="hidden cursor-pointer"
                      hidden
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>
            </div>
          </header>
          <div className="flex justify-between text-slate-400 items-center text-sm py-2">
            <p>Supported format: PNG/JPEG</p>
            <p>Maximum size: 25MB</p>
          </div>

          {fileError && <div className="text-sm text-red-500">{fileError}</div>}

          <section className="overflow-y-auto h-40 mt-3 space-y-3">
            {fileList.length ? (
              fileList.map((file, index) => {
                return (
                  <div
                    className="py-2 px-2 bg-slate-100 rounded-md"
                    key={index}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex gap-2">
                        <div>
                          <Image
                            src={file.url}
                            alt="upload svg"
                            width={100}
                            height={100}
                            className="w-10 aspect-square"
                          />
                        </div>

                        {!fileError && (
                          <div className="text-sm">
                            <h2 className="font-semibold">{file.name}</h2>
                            <p className="text-slate-400">
                              {fileSizeConversion(file.size)}
                            </p>
                          </div>
                        )}
                      </div>

                      <div
                        className="flex justify-center cursor-pointer items-center
                      p-2 hover:bg-slate-200 rounded-full"
                        onClick={() => removeFromList(index)}
                      >
                        <X size={18} />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-slate-400">{fileError}</p>
            )}
          </section>
        </section>
      </main>
    </>
  );
});
