import { Skeleton } from "./ui/skeleton";



export function MapSkeleton() {
  return (
    <>
      <div>
        <Skeleton className="w-full h-full aspect-auto bg-gray-200" />
      </div>
    </>
  );
}
