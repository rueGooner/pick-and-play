"use client";

import { handleOnboardingStepOne } from "@/lib/onboarding/update-profiles";
import { CoachOnboardingStepOne } from "@/types/onboarding.type";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useUploadStepOne() {
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
