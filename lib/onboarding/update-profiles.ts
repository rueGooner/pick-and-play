import { CoachOnboardingStepOne } from "@/types/onboarding.type";
import { supabaseClient } from "../supabase/client";
import { getAuthenticatedUser } from "../server/auth";
import { redirect } from "next/navigation";

export async function handleOnboardingStepOne(
  formData: CoachOnboardingStepOne
) {
  const supabase = supabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  console.log(profile);

  const {
    address_line,
    avatar_url,
    phone,
    postcode,
    lat,
    lng,
    town,
    date_of_birth,
  } = formData;

  const { error } = await supabase
    .from("profiles")
    .update({
      phone,
      date_of_birth,
      avatar_url,
      town,
      postcode,
      lat,
      lng,
      address_line,
      onboarding_step: 2,
      updated_at: new Date().toISOString(),
    })
    .eq("id", profile.id);

  if (error) throw new Error(error.message);

  return { success: true };
}
