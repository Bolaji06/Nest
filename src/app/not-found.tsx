import Image from "next/image";
import logo from "../../public/nest-logo.png"
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound(){

    return (
        <>
            <main className="bg-blue-100 h-screen">
                <div className="flex justify-center flex-col items-center h-screen w-screen align-middle
                space-y-5">
                    <div>
                        <Image 
                            src={logo}
                            width={100}
                            height={100}
                            alt="Nest logo"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold">404</h1>
                        |
                        <p>Page Not Found</p>

                    </div>
                    
                    <div>
                        <Button asChild className="bg-transparent hover:bg-transparent
                         text-blue-600 text-lg underline hover:text-blue-400">
                            <Link href={'/'}>Back Home</Link>
                        </Button>
                    </div>

                </div>

            </main>
        </>
    )
}