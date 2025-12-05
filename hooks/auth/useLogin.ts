"use client";

import { handleLogin } from "@/lib/auth";
import { LoginFields } from "@/types/auth.type";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useLogin() {
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: LoginFields) => {
      return await handleLogin(payload);
    },

    onSuccess: () => {
      toast.success("Registration Complete.");
      router.push("/dashboard");
    },

    onError: (error: unknown) => {
      toast.error(
        (error as Error).message || "An error occured during registration."
      );
    },
  });
}
