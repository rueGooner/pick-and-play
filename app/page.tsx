"use client";

import AboutSection from "@/components/home/AboutSection";
import ContactFormSection from "@/components/home/ContactFormSection";
import FrequentQuestionSection from "@/components/home/FrequentQuestionSection";
import HeaderSection from "@/components/home/HeaderSection";
import ImageSlider from "@/components/home/ImageSlider";
import PickAndPlaySection from "@/components/home/PickAndPlay";
import RoadToSection from "@/components/home/RoadToSection";
import FooterSection from "@/components/shared/FooterSection";
import { PickAndPlayProvider } from "./contexts/pick-and-play/pick-and-play.provider";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderSection />
      <ImageSlider />
      <main className="flex min-h-screen w-full flex-col items-center justify-between bg-emerald-50">
        <AboutSection />
       <PickAndPlayProvider>
         <PickAndPlaySection />
       </PickAndPlayProvider>
        <RoadToSection />
        <FrequentQuestionSection />
      </main>
      <ContactFormSection />
      <FooterSection />
    </div>
  );
}
