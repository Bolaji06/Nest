import { Skeleton } from "../ui/skeleton";

export function PostCardSkeleton() {
  return (
    <>
      <div
        className="rounded-xl bg-white border shadow-lg group cursor-pointer mb-12
            hover:shadow-lg transition-shadow duration-400 ease-in-out md:max-w-[300px]"
      >
        <div className="mb-4">
          <Skeleton className="w-full h-32 rounded-t-md bg-gray-200" />  
        </div>
        
        <div className="space-y-2 px-3 pb-4">
          <Skeleton className="w-32 h-2 bg-gray-200" />
          <Skeleton className="w-20 h-2 bg-gray-200" />
          <Skeleton className="w-36 h-2 bg-gray-200" />
        </div>
      </div>
    </>
  );
}