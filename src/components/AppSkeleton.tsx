import { Skeleton } from "./ui/skeleton";

export function PostCardSkeleton(){

    return (
        <>
           <section className="p-3 rounded-md bg-white shadow-md max-w-[250px] h-[180px]">
            <div className="w-full h-[100px] rounded-md space-y-2">
               <Skeleton className="w-full h-full rounded-md bg-gray-200"/> 
               <div className="space-y-2">
                <Skeleton className="w-32 h-2 bg-gray-200"/>
                <Skeleton className="w-20 h-2 bg-gray-200"/>
                <Skeleton className="w-36 h-2 bg-gray-200"/>
               </div>
            </div>
           </section>
        </>
    )
}