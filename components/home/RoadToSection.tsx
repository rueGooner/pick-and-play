import Image from "next/image";

export default function RoadToSection() {
  return (
    <section className="relative bg-emerald-50 flex flex-col md:flex-row w-full">
      {/* Background image (as actual image on mobile) */}
      <div className="relative w-full md:w-1/2 h-64 md:h-auto">
        <Image
          src="https://res.cloudinary.com/dofl9qbcd/image/upload/v1761249807/AdobeStock_157411104_ynxda3.jpg"
          alt="Road to SW19 Image"
          fill
          className="object-cover opacity-90"
          unoptimized
        />
      </div>

      {/* Text content */}
      <div className="bg-white w-full md:w-1/2 flex items-center justify-center p-8 md:p-20 lg:p-32 z-10">
        <div className="max-w-xl text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-emerald-800">
            Road to SW19
          </h2>
          <p className="text-gray-700 text-base leading-relaxed">
            Every legend starts somewhere, and for your child, that journey
            begins here. The <strong>GSM Tennis Academy</strong> is more than a
            training ground; it&apos;s where dedicated meets destiny. Under
            elite coaching and professional guidance, we nurture young players
            to choose the dream of stepping onto the hallowed lawns of
            Wimbledon. Enrol today and take the first step on the{" "}
            <a
              href="/login"
              className="text-emerald-600 hover:underline font-semibold"
            >
              Road to SW19{" "}
            </a>
            - where passion becomes purpose, and the journey defines the
            champion.
          </p>
        </div>
      </div>
    </section>
  );
}
