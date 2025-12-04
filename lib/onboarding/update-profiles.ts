import {
  CoachOnboardingStepOne,
  CoachOnboardingStepThree,
  CoachOnboardingStepTwo,
} from "@/types/onboarding.type";
import { supabaseClient } from "../supabase/client";
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

export async function handleOnboardingCoachStepTwo(
  formData: CoachOnboardingStepTwo
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

  const { bio, lta_level, lta_number, years_experience } = formData;

  const { error } = await supabase.from("coaches").upsert({
    id: profile.id,
    bio,
    lta_level,
    years_experience,
    lta_number,
    updated_at: new Date().toISOString(),
  });

  if (error) throw new Error(error.message);

  await supabase
    .from("profiles")
    .update({
      onboarding_step: 3,
    })
    .eq("id", profile.id);

  return { success: true };
}

export async function handleOnboardingCoachStepThree(
  formData: CoachOnboardingStepThree
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

  const {
    accepting_bookings,
    languages,
    price_per_hour,
    service_radius_miles,
    specialties,
    price_group_per_hour,
  } = formData;

  const { error } = await supabase
    .from("coaches")
    .update({
      accepting_bookings,
      languages,
      price_per_hour,
      service_radius_miles,
      specialties,
      price_group_per_hour,
    })
    .eq("id", profile.id);

  if (error) throw new Error(error.message);

  await supabase
    .from("profiles")
    .update({
      onboarding_step: 4,
    })
    .eq("id", profile.id);
  return { success: true };
}
