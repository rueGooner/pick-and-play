import AboutSection from "@/components/home/AboutSection";
import HeaderSection from "@/components/home/HeaderSection";
import ImageSlider from "@/components/home/ImageSlider";
import FooterSection from "@/components/shared/FooterSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderSection />
      <ImageSlider />
      <main className="flex min-h-screen w-full flex-col items-center justify-between bg-emerald-50">
        <AboutSection />
      </main>
      <FooterSection />
    </div>
  );
}
