import { NavigationGroup } from "@/types/navigation.type";
import {
  Calendar1Icon,
  ClockIcon,
  MapPinIcon,
  ListCheckIcon,
  BanIcon,
  RepeatIcon,
  UsersIcon,
  DollarSignIcon,
  FileTextIcon,
  UserIcon,
  CogIcon,
  LayoutDashboard,
  Settings,
  UserCircle,
  UserCog,
  UserPlus,
  WrenchIcon,
} from "lucide-react";

export const coachNavigation: NavigationGroup[] = [
  {
    title: "Dashboard",
    items: [
      {
        href: "/dashboard",
        label: "Overview",
        icon: LayoutDashboard,
        match: "/dashboard",
        exact: true,
      },
    ],
  },
  {
    title: "Sessions",
    items: [
      {
        href: "/dashboard/sessions/create",
        label: "Create New Session",
        icon: Calendar1Icon,
        match: "/dashboard/sessions/create",
      },
      {
        href: "/dashboard/sessions/mine",
        label: "My Sessions",
        icon: FileTextIcon,
        match: "/dashboard/sessions/mine",
      },
      // {
      //   href: "/dashboard/sessions/templates",
      //   label: "Session Templates",
      //   icon: RepeatIcon,
      //   match: "/dashboard/sessions/templates",
      // },
    ],
  },
  {
    title: "Availability",
    items: [
      {
        href: "/dashboard/availability",
        label: "Calendar",
        icon: ClockIcon,
        match: "/dashboard/availability",
      },
      {
        href: "/dashboard/availability/rules",
        label: "Recurring Rules",
        icon: RepeatIcon,
        match: "/dashboard/availability/rules",
      },
      {
        href: "/dashboard/availability/blackout",
        label: "Blackout Dates",
        icon: BanIcon,
        match: "/dashboard/availability/blackout",
      },
      {
        href: "/dashboard/locations",
        label: "My Locations",
        icon: MapPinIcon,
        match: "/dashboard/locations",
      },
    ],
  },
  {
    title: "Bookings",
    items: [
      {
        href: "/dashboard/bookings",
        label: "All Bookings",
        icon: Calendar1Icon,
        match: "/dashboard/bookings",
      },
      {
        href: "/dashboard/waitlist",
        label: "Waitlist",
        icon: ListCheckIcon,
        match: "/dashboard/waitlist",
      },
      {
        href: "/dashboard/clients",
        label: "My Clients",
        icon: UsersIcon,
        match: "/dashboard/clients",
      },
    ],
  },
  {
    title: "Finance",
    items: [
      {
        href: "/dashboard/payouts",
        label: "Payouts",
        icon: DollarSignIcon,
        match: "/dashboard/payouts",
      },
      {
        href: "/dashboard/pricing",
        label: "Pricing",
        icon: DollarSignIcon,
        match: "/dashboard/pricing",
      },
    ],
  },
  {
    title: "Profile & Settings",
    items: [
      {
        href: "/dashboard/coach/profile",
        label: "Public Profile",
        icon: UserIcon,
        match: "/dashboard/coach/profile",
      },
      {
        href: "/dashboard/coach/settings",
        label: "Settings",
        icon: CogIcon,
        match: "/dashboard/coach/settings",
      },
    ],
  },
];

export const playerNavigation: NavigationGroup[] = [
  {
    title: "Dashboard",
    items: [
      {
        href: "/dashboard",
        label: "Overview",
        icon: LayoutDashboard,
        match: "/dashboard",
        exact: true,
      },
    ],
  },
  {
    title: "Tennis",
    items: [
      {
        href: "/dashboard/sessions",
        label: "Available Sessions",
        icon: ListCheckIcon,
        match: "/dashboard/sessions",
      },
      {
        href: "/dashboard/bookings",
        label: "My Bookings",
        icon: Calendar1Icon,
        match: "/dashboard/bookings",
      },
    ],
  },
];

export const adminNavigation: NavigationGroup[] = [
  {
    title: "Users",
    items: [
      {
        href: "/users",
        label: "All Users",
        icon: UserCog,
        match: "/users",
      },
      {
        href: "/coaches",
        label: "Coaches",
        icon: UserCircle,
        match: "/coaches",
      },
      {
        href: "/guardians",
        label: "Guardians",
        icon: UserPlus,
        match: "/guardians",
      },
    ],
  },
  {
    title: "Sessions",
    items: [
      {
        href: "/dashboard/sessions/new",
        label: "Create New Session",
        icon: Calendar1Icon,
        match: "/dashboard/sessions/new",
      },
      {
        href: "/dashboard/sessions",
        label: "Sessions",
        icon: Calendar1Icon,
        match: "/dashboard/sessions",
      },
    ],
  },
  {
    title: "Bookings",
    items: [
      {
        href: "/bookings",
        label: "All Bookings",
        icon: Calendar1Icon,
        match: "/bookings",
      },
      {
        href: "/waitlist",
        label: "Waitlist",
        icon: ListCheckIcon,
        match: "/waitlist",
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        href: "/settings",
        label: "Settings",
        icon: Settings,
        match: "/settings",
      },
      {
        href: "/change-requests",
        label: "Change Requests",
        icon: WrenchIcon,
        match: "/change-requests",
      },
    ],
  },
];
