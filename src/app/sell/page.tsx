import NavBar from "@/components/ui/NavBar";
import sellbg from "../../../public/hero.jpg";
import Image from "next/image";

export default async function SellPage(): Promise<React.JSX.Element> {
    
  return (
    <>
      <section className="h-screen w-screen overflow-hidden">
        <div>
          <NavBar className="relative z-50"/>
        </div>

        <div className="w-full">
          <div className="relative w-full">
            <div className="absolute inset-0 bg-black/60"/>
            <Image
              src={sellbg}
              objectFit="cover"
              width={1000}
              height={100}
              alt="sell bg"
              className="w-full h-screen object-cover" 
            />
        

            <div className="px-4 w-full flex flex-col justify-center items-center absolute top-10 md:top-28 -translate-x-1/2 left-1/2 z-50 text-white">
              <div className="space-y-3 text-center w-full">
                <h1 className="text-2xl lg:text-5xl font-bold mt-10 font-serif">
                  Sell your home with confidence
                </h1>
                <div className="mx-auto">
                   <p className="text-xl text-center">
                  Nest is making it possible to sell your home and find
                  potential buyers
                </p> 
                </div>
                
              </div>

              <div className="py-4 mt-3 text-center">
                <h2>
                  You need to login or register to be able to sell your home on
                  Nest
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
