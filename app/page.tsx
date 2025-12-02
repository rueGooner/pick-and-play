import HeaderSection from "@/components/home/HeaderSection";
import ImageSlider from "@/components/home/ImageSlider";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderSection />
      <ImageSlider />
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-32 px-16 bg-emerald-50"></main>
    </div>
  );
}
