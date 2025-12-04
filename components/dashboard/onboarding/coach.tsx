"use client";

import { BaseProfile } from "@/types/profiles.type";
import CoachStepOne from "./CoachStepOne";
import CoachStepTwo from "./CoachStepTwo";
import CoachStepThree from "./CoachStepThree";
import CoachStepFour from "./CoachStepFour";

export default function CoachOnboarding({
  step,
  profile,
}: {
  step: number;
  profile: BaseProfile;
}) {
  return (
    <div className="mx-auto">
      <div className="flex flex-col flex-1 p-10 bg-white">
        <div className="relative">
          <h2 className="text-xl font-semibold text-slate-700 mb-2">
            You can now complete your coach profile
          </h2>
          <p className="text-sm text-slate-600 mb-8">
            <strong>All fields are mandatory.</strong>
          </p>
        </div>
        {step === 1 && (
          <CoachStepOne
            firstname={profile.firstname}
            lastname={profile.lastname}
          />
        )}
        {step === 2 && <CoachStepTwo />}
        {step === 3 && <CoachStepThree />}
        {step === 4 && <CoachStepFour />}
      </div>
    </div>
  );
}
