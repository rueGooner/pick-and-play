"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

interface ImageSliderProps {
  images?: Record<string, string>[];
}

const defaultImages = [
  {
    image:
      "https://res.cloudinary.com/dofl9qbcd/image/upload/v1761249812/AdobeStock_739004629_zqfuz7.jpg",
    heading: "Adult Coaching",
    tagline: "1-2-1 lessons as well as group sessions available",
    href: "/adults",
  },
  {
    image:
      "https://res.cloudinary.com/dofl9qbcd/image/upload/v1761249806/AdobeStock_93333228_bhrxxy.jpg",
    heading: "Junior Coaching",
    tagline: "From mini courts to full size courts across all age groups",
    href: "/juniors",
  },
  {
    image:
      "https://res.cloudinary.com/dofl9qbcd/image/upload/v1762890188/Girl_in_Vest_yshnq5.png",
    heading: "Shop GSM Gear",
    tagline: "Expore our collection of GSM Gear",
    href: "/store",
  },
];

const ImageSlider: React.FC<ImageSliderProps> = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, EffectFade]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 4500 }}
      loop
      effect="fade"
      className="w-full h-[70vh] relative"
    >
      {defaultImages.map((src, idx) => (
        <SwiperSlide key={idx}>
          <div className="relative w-full h-full">
            {/* Background image */}
            <Image
              src={src.image}
              width={1920}
              height={1080}
              alt={`Slide ${idx + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              unoptimized
            />

            {/* Optional dark overlay for readability */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Centered text content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
              <p className="max-w-2xl mx-auto text-lg md:text-xl mb-2 drop-shadow-md">
                {src.tagline}
              </p>
              <a
                href={src.href}
                aria-label={`Navigate to ${src.heading}`}
                className="text-5xl md:text-6xl font-extrabold mb-6 font-montserrat drop-shadow-lg uppercase focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400 transition-shadow"
              >
                {src.heading}
              </a>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
