"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavigationGroup } from "@/types/navigation.type";

export default function MobileSidebar({
  navigationItems,
  pathname,
  onLogout,
}: {
  navigationItems: NavigationGroup[];
  pathname: string;
  onLogout: () => void;
}) {
  return (
    <header className="md:hidden bg-white border-b border-emerald-200 h-16 flex items-center justify-between px-4 shadow-sm">
      <h1 className="text-lg font-bold text-emerald-700">GSM Dashboard</h1>

      {/* Mobile Navigation Drawer */}
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
          className="bg-white w-64 border-l border-emerald-100 px-5"
        >
          <SheetHeader>
            <SheetTitle className="text-emerald-700 font-semibold text-lg text-center mt-2">
              GSM Dashboard
            </SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col mt-6 space-y-3 text-base">
            {/* Flatten navigation groups into one list */}
            {navigationItems
              .flatMap((group) => group.items)
              .map(({ href, label, match }) => {
                const isActive =
                  pathname === match ||
                  pathname === href ||
                  pathname.startsWith(match + "/");

                return (
                  <Link
                    key={href}
                    href={href}
                    className={`px-4 py-2 rounded-md transition ${
                      isActive
                        ? "bg-emerald-600 text-white"
                        : "text-emerald-700 hover:bg-emerald-50"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}

            <div className="border-t border-emerald-100 my-3" />

            {/* Profile Link */}
            <Link
              href="/settings/profile"
              className={`px-4 py-2 rounded-md transition ${
                pathname === "/settings/profile"
                  ? "bg-emerald-600 text-white"
                  : "text-emerald-700 hover:bg-emerald-50"
              }`}
            >
              My Profile
            </Link>

            {/* Logout Button */}
            <Button
              className="px-4 py-2 border border-emerald-600 text-emerald-600 rounded-md text-center hover:bg-emerald-700 hover:text-white transition"
              onClick={onLogout}
            >
              Logout
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
