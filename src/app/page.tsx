import ExploreGrid from "@/components/ExploreGrid";
import FooterHero from "@/components/FooterHero";

import HeroSection from "@/components/HeroSection";
import LoginSignUp from "@/components/LoginSignUp";
import NavBar from "@/components/ui/NavBar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <NavBar />

     
      
      <div className="px-4 relative top-16">
        <HeroSection />
        <ExploreGrid />
        <FooterHero />
      </div>
     
    </main>
  );
}
