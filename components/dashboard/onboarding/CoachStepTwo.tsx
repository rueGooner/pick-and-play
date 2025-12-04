"use client";

import CustomInput from "@/components/shared/form/CustomInput";
import { TextAreaInput } from "@/components/shared/form/TextAreaInput";
import { Button } from "@/components/ui/button";
import { useOnboardingCoachStepTwo } from "@/hooks/onboarding/useOnboarding";
import { coachStepTwoSchema } from "@/schemas/onboarding.schema";
import { CoachOnboardingStepTwo } from "@/types/onboarding.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";

export default function CoachStepTwo() {
  const updateStepTwo = useOnboardingCoachStepTwo();

  const { register, handleSubmit } = useForm<CoachOnboardingStepTwo>({
    resolver: zodResolver(coachStepTwoSchema),
  });

  const onSubmit = async (data: CoachOnboardingStepTwo) => {
    await updateStepTwo.mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <CustomInput
          label="LTA Number"
          name="lta_number"
          register={register}
          type="text"
        />
        <CustomInput
          label="LTA Level"
          name="lta_level"
          register={register}
          type="number"
        />
        <CustomInput
          label="Years Experience"
          name="years_experience"
          register={register}
          type="number"
        />
      </div>
      <div className="grid gap-4">
        <TextAreaInput name="bio" register={register} label="Coach Biography" />
      </div>
      <div className="flex justify-end mt-auto">
        <Button
          type="submit"
          className="bg-emerald-600 text-white hover:bg-emerald-700"
        >
          Save Step Two
        </Button>
      </div>
    </form>
  );
}
