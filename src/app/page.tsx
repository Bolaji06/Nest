import ExploreGrid from "@/components/ExploreGrid";
import FooterHero from "@/components/FooterHero";

import HeroSection from "@/components/HeroSection";
import LoginSignUp from "@/components/LoginSignUp";
import Outlet from "@/components/AuthOutlet";
import NavBar from "@/components/ui/NavBar";
import Image from "next/image";
import { Suspense } from "react";
import { getUserSession } from "@/lib/getSession";


export default async function Home() {

  return (
    <main className="">
      
        <NavBar />

      <div className="px-4 relative top-16">
        <Suspense fallback={<p>Loading...</p>}>
          <HeroSection />
        </Suspense>
        <ExploreGrid />
        <FooterHero />
      </div>
    </main>
  );
}
