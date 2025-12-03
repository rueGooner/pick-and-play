"use client";

import {
  coachNavigation,
  playerNavigation,
  adminNavigation,
} from "@/lib/menus/sidebar.navigation";
import { supabaseClient } from "@/lib/supabase/client";
import { NavigationGroup } from "@/types/navigation.type";
import {
  Calendar1Icon,
  ListCheckIcon,
  Settings,
  UserCircle,
  UserCog,
  UserPlus,
  WrenchIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import MobileSidebar from "./MobileSidebar";
import DesktopSidebar from "./DesktopSidebar";

export default function DashboardWrapper({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) {
  const router = useRouter();
  const supabase = supabaseClient();

  let navigationItems: NavigationGroup[];

  switch (user.role) {
    case "coach":
      navigationItems = coachNavigation;
      break;
    case "guardian":
    case "player":
      navigationItems = playerNavigation;
      break;
    case "admin":
      navigationItems = adminNavigation;
      break;
    default:
      navigationItems = playerNavigation;
      break;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();

    await fetch("/api/auth/set", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session: null }),
    });

    router.push("/");
  };

  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col md:grid md:grid-cols-5 bg-emerald-50">
      <DesktopSidebar
        navigationItems={navigationItems}
        pathname={pathname}
        user={user}
        onLogout={handleLogout}
      />
      <MobileSidebar
        navigationItems={navigationItems}
        onLogout={handleLogout}
        pathname={pathname}
      />

      <main className="flex flex-col flex-1 min-h-0 md:col-span-4 relative">
        {children}
      </main>
    </div>
  );
}
