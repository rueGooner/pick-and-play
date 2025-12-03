"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { NavigationGroup } from "@/types/navigation.type";
import { UserCircle, UserCog } from "lucide-react";
import Link from "next/link";

export default function DesktopSidebar({
  navigationItems,
  pathname,
  user,
  onLogout,
}: {
  navigationItems: NavigationGroup[];
  pathname: string;
  user: {
    firstname: string;
    lastname: string;
    role: string;
  };
  onLogout: () => void;
}) {
  const baseLink =
    "group flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors border border-transparent";
  const activeLink = "text-white bg-emerald-700 border-emerald-500";
  const idleLink =
    "text-foreground hover:text-white hover:bg-emerald-700 hover:border-emerald-300 text-emerald-700 font-light";
  const iconBase = "h-4 w-4";
  const iconIdle = "opacity-80 group-hover:opacity-100";

  console.log(user);

  return (
    <aside className="hidden md:flex flex-col md:col-span-1 bg-white border-r border-emerald-300">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-emerald-300">
        <h1 className="text-lg font-bold text-emerald-700">GSM Dashboard</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-4 p-4">
          {navigationItems.map((group) => (
            <div key={group.title}>
              <h2 className="text-xs uppercase text-emerald-700 font-semibold mb-2">
                {group.title}
              </h2>

              <ul className="space-y-1">
                {group.items.map(
                  ({ href, label, icon: Icon, match, exact }) => {
                    const isActive = exact
                      ? pathname === match
                      : pathname === match || pathname.startsWith(match + "/");

                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          className={cn(
                            baseLink,
                            isActive ? activeLink : idleLink,
                            "flex items-center"
                          )}
                        >
                          <Icon className={cn(iconBase, iconIdle)} />
                          <span>{label}</span>
                        </Link>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {/* User Menu */}
      <div className="p-4 border-t border-emerald-300">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex w-full items-center gap-3 p-2"
            >
              <UserCircle className="text-emerald-700 w-24 h-24" />
              <div className="text-left">
                <p className="text-sm font-semibold">
                  {user.firstname} {user.lastname} {user.role}
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56 bg-white border border-emerald-200 shadow-md rounded-xl overflow-hidden"
          >
            <DropdownMenuLabel className="text-emerald-800 font-semibold p-4">
              My Account
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-emerald-100" />

            <DropdownMenuGroup>
              <DropdownMenuItem
                asChild
                className="cursor-pointer text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors duration-150"
              >
                <Link
                  href="/settings/profile"
                  className="w-full flex text-sm p-4"
                >
                  <UserCog className="w-4 h-4 mr-2" />
                  Profile Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-emerald-100" />

            <DropdownMenuItem
              onClick={onLogout}
              className="text-red-600 hover:bg-red-50 focus:bg-red-100 focus:text-red-700 font-medium transition-colors duration-150 p-4 cursor-pointer"
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
