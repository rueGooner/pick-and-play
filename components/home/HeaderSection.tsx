import { Menu } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import Image from "next/image";
import Link from "next/link";

export default function HeaderSection() {
  return (
    <header className="bg-white border-b border-emerald-600 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center p-3">
        {/* Logo + Brand */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo-two.jpeg"
            alt="GSM Tennis Academy"
            width={70}
            height={70}
            priority
          />
          {/* <span className="text-xl font-bold text-emerald-700 tracking-tight">
            GSM Tennis Academy
          </span> */}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex md:flex-wrap md:items-center md:justify-center md:text-xs lg:text-base text-sm md:text-base md:items-center md:justfiy-center font-semibold lg:no-shrink lg:flex-grow-1">
          <Link
            href="/juniors"
            className="text-emerald-600 hover:text-white hover:bg-emerald-600 px-4 py-2 rounded-md transition text-center"
          >
            For Juniors
          </Link>
          <Link
            href="/adults"
            className="text-emerald-600 hover:text-white hover:bg-emerald-600 px-4 py-2 rounded-md transition text-center"
          >
            For Adults
          </Link>
          <Link
            href="/coaches"
            className="text-emerald-600 hover:text-white hover:bg-emerald-600 px-4 py-2 rounded-md transition text-center"
          >
            Find a Coach
          </Link>
          <Link
            href="/store"
            className="text-emerald-600 hover:text-white hover:bg-emerald-600 px-4 py-2 rounded-md transition text-center"
          >
            GSM Store
          </Link>
          <Link
            href="/contact"
            className="text-emerald-600 hover:text-white hover:bg-emerald-600 px-4 py-2 rounded-md transition text-center"
          >
            Contact Us
          </Link>
        </nav>

        {/* Desktop Sign In */}
        <div className="hidden md:flex md:flex-col lg:flex-row gap-2 lg:flex-none">
          <Link
            href="/login"
            className="border border-emerald-600 text-emerald-600 text-sm px-4 py-2 rounded-md hover:bg-emerald-100 transition font-semibold  text-center lg:flex lg:items-center lg:justify-center"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="bg-emerald-600 text-white text-sm px-4 py-2 rounded-md hover:bg-emerald-700 transition font-semibold  text-center lg:flex lg:items-center lg:justify-center lg:text-xs"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="p-2 border border-emerald-600 rounded-md text-emerald-600 hover:bg-emerald-100"
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-white w-64 border-l border-emerald-100 px-4"
            >
              <SheetHeader>
                <SheetTitle className="text-emerald-700 font-semibold text-lg text-center mt-2">
                  GSM Tennis Academy
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col mt-6 space-y-3 text-base">
                <Link
                  href="/"
                  className="px-4 py-2 rounded-md text-emerald-700 hover:bg-emerald-50 transition"
                >
                  Home
                </Link>{" "}
                <Link
                  href="/juniors"
                  className="px-4 py-2 rounded-md text-emerald-700 hover:bg-emerald-50 transition"
                >
                  For Juniors
                </Link>
                <Link
                  href="/adults"
                  className="px-4 py-2 rounded-md text-emerald-700 hover:bg-emerald-50 transition"
                >
                  For Adults
                </Link>
                <Link
                  href="/coaches"
                  className="px-4 py-2 rounded-md text-emerald-700 hover:bg-emerald-50 transition"
                >
                  Find a Coach
                </Link>
                <Link
                  href="/store"
                  className="px-4 py-2 rounded-md text-emerald-700 hover:bg-emerald-50 transition"
                >
                  GSM Store
                </Link>
                <Link
                  href="/contact"
                  className="px-4 py-2 rounded-md text-emerald-700 hover:bg-emerald-50 transition"
                >
                  Contact Us
                </Link>
                <div className="border-t border-emerald-100 my-3"></div>
                <Link
                  href="/login"
                  className="px-4 py-2 border border-emerald-600 text-emerald-700 rounded-md text-center hover:bg-emerald-50 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md text-center hover:bg-emerald-700 transition"
                >
                  Sign Up
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
