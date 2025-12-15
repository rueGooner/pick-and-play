import { CoachProfile } from "@/types/coach.type";
import { BaseProfile } from "@/types/profiles.type";
import { FC } from "react";

interface DashboardHeaderProps {
  profile: BaseProfile | CoachProfile;
}

export const DashboardHeader: FC<DashboardHeaderProps> = ({ profile }) => (
  <div className="bg-white rounded shadow-md p-6 m-8 relative">
    <h2 className="text-xl font-semibold text-slate-700 mb-2">
      Welcome back {`${profile.firstname} ${profile.lastname}`}
    </h2>
    <p className="text-slate-600 text-sm">
      Browse sessions, manage bookings, and track your progress.
    </p>
  </div>
);
