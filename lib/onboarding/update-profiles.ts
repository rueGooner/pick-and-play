import {
  CoachOnboardingStepFour,
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

export async function handleCompleteCoachOnboarding(
  formData: CoachOnboardingStepFour
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

  const { availability, custom_venues, venue_ids } = formData;

  console.log({ availability, custom_venues, venue_ids });
  // await supabase.from("coach_availability").delete().eq("coach_id", profile.id);

  // const insertPayload = availability.map((a) => ({
  //   coach_id: profile.id,
  //   day_of_week: a.day_of_week,
  //   start_time: a.start_time,
  //   end_time: a.end_time,
  // }));

  // if (formData.availability.length > 0) {
  //   const { error: availabilityError } = await supabase
  //     .from("coach_availability")
  //     .insert(insertPayload);

  //   if (availabilityError) throw new Error(availabilityError.message);
  // }

  // await supabase
  //   .from("coach_service_areas")
  //   .delete()
  //   .eq("coach_id", profile.id);

  // if (formData.venue_ids.length > 0) {
  //   const { error: venueError } = await supabase
  //     .from("coach_service_areas")
  //     .insert(
  //       formData.venue_ids.map((venue_id) => ({
  //         coach_id: profile.id,
  //         venue_id,
  //       }))
  //     );

  //   if (venueError) throw new Error(venueError.message);

  //   const { error: coachUpdateErr } = await supabase
  //     .from("coaches")
  //     .update({
  //       profile_complete: true,
  //       updated_at: new Date().toISOString(),
  //     })
  //     .eq("id", profile.id);

  //   if (coachUpdateErr) throw new Error(coachUpdateErr.message);

  //   return { success: true };
  // }
}
