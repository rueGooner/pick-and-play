import CoachDashboard from "@/components/dashboard/CoachDashboard";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StripeNotice } from "@/components/dashboard/StripeNotice";
import StripeStatusSync from "@/components/stripe/StatusSync";
import { getAuthenticatedUser } from "@/lib/server/auth";

export default async function DashboardPage() {
  const { profile } = await getAuthenticatedUser();

  const roleBasedDashboard = (role: string) => {
    switch(role) {
      case 'admin':
        return 'ADMIN DASHBOARD';
      case 'coach':
        return <CoachDashboard profile={profile} />
      case 'player':
      case 'guardian':
        return 'PLAYERS AND GUARDIANS'

    }
  }
  return (
    <>
      {profile.role === 'coach' && <StripeStatusSync />}
      <header className="hidden md:block bg-white border-b border-emerald-300 h-16">
        <div className="mx-auto px-10 flex items-center justify-between h-full">
          <h1 className="text-xl sm:text-2xl font-bold text-emerald-700">
            GSM Tennis Academy
          </h1>
        </div>
      </header>
      <section className="grid">
        {!profile.is_onboarded ? (
          <StripeNotice profile={profile} />
        ) : (
          <DashboardHeader profile={profile} />
        )}
        {profile && profile.role && roleBasedDashboard(profile.role)}
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </section>
    </>
  );
}


