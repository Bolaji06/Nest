import agentSvg from "../../public/agent.svg";
import HouseSvg from "../../public/house.svg";
import forSaleSvg from "../../public/for-sale.svg";
import buySvg from "../../public/shopping-cart.svg";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export default function ExploreGrid() {
  return (
    <>
      <main className="bg-gray-100">
        <div className="mt-10 py-4">
          <header>
            <h1 className="text-3xl md:text-4xl py-4 text-center font-bold text-brand-text">
              Explore diverse options on Nest
            </h1>
          </header>
          <div className="grid md:grid-cols-3 gap-2 max-w-4xl mx-auto mt-10">
            <div className="p-5 hover:ring-1 rounded-md hover:ring-orange-100">
              <div className="flex justify-center items-center">
                <div className="relative">
                  <Image src={buySvg} alt="for sale svg image" width={80} />
                  <div className="absolute top-0 -z-10 left-6 rounded-full w-[80px] h-[80px] bg-purple-400/25" />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="py-2 max-w-64 text-center">
                  <h3 className="font-medium text-2xl">
                    Buy a home
                  </h3>
                  <p className="py-3">
                  With over 1 million+ homes for sale available 
                  on the website, Nest can match you with a 
                  house you will want to call home.
                  </p>
                </div>
                <Button asChild className="text-center border border-brand-secondary hover:bg-brand-secondary hover:text-brand-text_light  bg-transparent text-brand-secondary hover ">
                    <Link
                    href={'/buy'}>
                        Find a home
                    </Link>     
                </Button>
              </div>
            </div>

            <div className="p-5 hover:ring-1 rounded-md hover:ring-orange-100">
              <div className="flex justify-center items-center">
                <div className="relative">
                  <Image src={HouseSvg} alt="for sale svg image" width={80} />
                  <div className="absolute top-0 -z-10 left-6 rounded-full w-[80px] h-[80px] bg-blue-400/25" />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="py-2 max-w-64 text-center">
                  <h3 className="font-medium text-2xl">
                    Rent a home
                  </h3>
                  <p className="py-3">
                  We’re creating a seamless online 
                  experience – from shopping on the largest 
                  rental network, to applying, to paying rent.
                  </p>
                </div>
                <Button asChild className="text-center border border-brand-secondary hover:bg-brand-secondary hover:text-brand-text_light  bg-transparent text-brand-secondary hover ">
                    <Link
                    href={'/rent'}>
                        Find a home
                    </Link>     
                </Button>
              </div>
            </div>

            <div className="p-5 hover:ring-1 rounded-md hover:ring-orange-100">
              <div className="flex justify-center items-center">
                <div className="relative">
                  <Image src={forSaleSvg} alt="for sale svg image" width={80} />
                  <div className="absolute top-0 -z-10 left-6 rounded-full w-[80px] h-[80px] bg-green-400/25" />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="py-2 max-w-64 text-center">
                  <h3 className="font-medium text-2xl">
                    Sell a home
                  </h3>
                  <p className="py-3">
                  No matter what path you take to sell your home,
                we can help you navigate a successful sale.
                  </p>
                </div>
                <Button asChild className="text-center border border-brand-secondary hover:bg-brand-secondary hover:text-brand-text_light  bg-transparent text-brand-secondary hover ">
                    <Link
                    href={'/sell'}>
                        Find a home
                    </Link>     
                </Button>
              </div>
            </div>



          </div>
        </div>
      </main>
    </>
  );
}
