"use client";

import { handleRegistration } from "@/lib/auth";
import { RegisterSchema } from "@/schemas/auth/registration.schema";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useRegistration() {
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: RegisterSchema) => {
      return await handleRegistration(payload);
    },

    onSuccess: () => {
      console.log("SUCCESSFUL - REDIRECT");
    },

    onError: (error: unknown) => {
      toast.error(
        (error as Error).message || "An error occured during registration."
      );
    },
  });
}
