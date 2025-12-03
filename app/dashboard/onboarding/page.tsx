import CoachOnboarding from "@/components/dashboard/onboarding/coach";
import PlayerOnboarding from "@/components/dashboard/onboarding/player";
import { OnboardingWizardHeader } from "@/components/dashboard/onboarding/steps";
import { getAuthenticatedUser } from "@/lib/server/auth";

const coachSteps = [
  { label: "Basic Info", stepNum: 1 },
  { label: "Coaching Details", stepNum: 2 },
  { label: "Skills & Pricing", stepNum: 3 },
  { label: "Availability", stepNum: 4 },
];

export default async function OnboardingPage() {
  const { profile, email } = await getAuthenticatedUser();

  return (
    <div className="bg-white min-h-screen">
      <section className="hidden md:block bg-white border-b border-emerald-300 h-16">
        <div className="mx-auto px-10 flex items-center justify-between h-full">
          <h1 className="text-xl sm:text-2xl font-bold text-emerald-700">
            Onboarding Step {profile.onboarding_step}
          </h1>
        </div>
      </section>
      {profile.role === "coach" && (
        <>
          <OnboardingWizardHeader
            steps={coachSteps}
            currentStep={profile.onboarding_step}
          />
          <CoachOnboarding profile={profile} step={profile.onboarding_step} />
        </>
      )}
      {profile.role === "player" && <PlayerOnboarding />}
    </div>
  );
}
