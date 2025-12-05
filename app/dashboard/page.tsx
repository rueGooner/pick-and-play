import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StripeNotice } from "@/components/dashboard/StripeNotice";
import { getAuthenticatedUser } from "@/lib/server/auth";

export default async function DashboardPage() {
  const { profile } = await getAuthenticatedUser();

  return (
    <>
      <header className="hidden md:block bg-white border-b border-emerald-300 h-16">
        <div className="mx-auto px-10 flex items-center justify-between h-full">
          <h1 className="text-xl sm:text-2xl font-bold text-emerald-700">
            GSM Tennis Academy
          </h1>
        </div>
      </header>
      <section className="grid">
        <pre>{JSON.stringify(profile, null, 2)}</pre>
        {!profile.is_onboarded ? (
          <StripeNotice profile={profile} />
        ) : (
          <DashboardHeader profile={profile} />
        )}
      </section>
    </>
  );
}
