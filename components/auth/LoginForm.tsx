"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { supabaseClient } from "@/lib/supabase/client";
import CustomInput from "../shared/form/CustomInput";
import { LoginFields } from "@/types/auth.type";

export default function LoginPage() {
  const router = useRouter();
  const supabase = supabaseClient();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<LoginFields>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (payload: LoginFields) => {
    setServerError(null);

    const { error, data } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });

    if (error) {
      setServerError(error.message);
      return;
    }

    const { session } = data;
    if (session) {
      await fetch("/api/auth/set", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session }),
      });
    }

    router.push("/dashboard");
  };

  const quickLogin = (email: string, password: string) => {
    setValue("email", email);
    setValue("password", password);
    handleSubmit(onSubmit)(); // immediately triggers login
  };

  return (
    <div className="max-w-xl grid place-items-center mx-auto w-1/3 flex flex-col gap-4 row-start-2 items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full bg-white p-6 rounded-xl shadow-md border border-emerald-200"
      >
        <h1 className="text-2xl font-semibold text-center text-slate-600">
          Admin Login
          <div className="mt-2 h-[2px] w-24 bg-gradient-to-r from-emerald-500 to-teal-400 mx-auto rounded-full"></div>
        </h1>

        <CustomInput name="email" label="Email" register={register} />
        <CustomInput
          name="password"
          label="Password"
          type="password"
          register={register}
        />

        {serverError && <p className="text-sm text-red-600">{serverError}</p>}

        <div className="px-3 mt-8 grid grid-cols-4 gap-2">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => quickLogin("ruebencee@gmail.com", "i6a8uejKJc!!")}
            className="font-semibold w-full rounded bg-emerald-600 text-white py-2 disabled:opacity-60"
          >
            Admin
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={
              () => quickLogin("astrid.feeney@yahoo.com", "DevSeedPassword123!")
              // quickLogin("dante_marvin@gmail.com", "DevSeedPassword123!")
            }
            className="font-semibold w-full rounded bg-emerald-600 text-white py-2 disabled:opacity-60"
          >
            Coach
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() =>
              quickLogin(
                "christiana_rutherford@gmail.com",
                "DevSeedPassword123!"
              )
            }
            className="font-semibold w-full rounded bg-emerald-600 text-white py-2 disabled:opacity-60"
          >
            Guardian
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() =>
              quickLogin("michel_bins65@gmail.com", "DevSeedPassword123!")
            }
            className="font-semibold w-full rounded bg-emerald-600 text-white py-2 disabled:opacity-60"
          >
            Player
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="font-semibold w-full rounded bg-emerald-600 text-white py-2 disabled:opacity-60"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
