"use client";

import {
  handleCompleteCoachOnboarding,
  handleOnboardingCoachStepThree,
  handleOnboardingCoachStepTwo,
  handleOnboardingStepOne,
} from "@/lib/onboarding/update-profiles";
import {
  CoachOnboardingStepFour,
  CoachOnboardingStepOne,
  CoachOnboardingStepThree,
  CoachOnboardingStepTwo,
} from "@/types/onboarding.type";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useOnboardingStepOne() {
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: CoachOnboardingStepOne) => {
      return await handleOnboardingStepOne(payload);
    },

    onSuccess: () => {
      toast.success("Step one completed.");
      router.refresh();
    },

    onError: () => {
      toast.error("Error during Step One");
    },
  });
}

export function useOnboardingCoachStepTwo() {
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: CoachOnboardingStepTwo) => {
      return await handleOnboardingCoachStepTwo(payload);
    },

    onSuccess: () => {
      toast.success("Step two completed.");
      router.refresh();
    },

    onError: () => {
      toast.error("Error during Step Two");
    },
  });
}

export function useOnboardingCoachStepThree() {
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: CoachOnboardingStepThree) => {
      return await handleOnboardingCoachStepThree(payload);
    },

    onSuccess: () => {
      toast.success("Step two completed.");
      router.refresh();
    },

    onError: () => {
      toast.error("Error during Step Two");
    },
  });
}

export function useCompleteOnboardingSteps() {
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: CoachOnboardingStepFour) => {
      return await handleCompleteCoachOnboarding(payload);
    },

    onSuccess: () => {
      toast.success("Profile Complete");
      router.push("/dashboard");
    },

    onError: () => {
      toast.error("An error occured whilst completing onboarding");
    },
  });
}
