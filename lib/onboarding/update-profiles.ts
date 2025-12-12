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

  if (!profile) throw new Error("Profile not found");

  const { availability, custom_venues = [], venue_ids = [] } = formData;

  // Handle availability: delete existing and insert new
  const { error: deleteAvailabilityError } = await supabase
    .from("coach_availability")
    .delete()
    .eq("coach_profile_id", profile.id);

  if (deleteAvailabilityError)
    throw new Error(
      `Failed to delete existing availability: ${deleteAvailabilityError.message}`
    );

  if (availability.length > 0) {
    // Valid day_of_week values
    const validDays = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ] as const;

    // Filter out invalid availability entries (must have valid day_of_week, start_time, and end_time)
    const validAvailability = availability.filter(
      (a) =>
        a.day_of_week &&
        validDays.includes(a.day_of_week as typeof validDays[number]) &&
        a.start_time &&
        a.end_time &&
        typeof a.start_time === "string" &&
        typeof a.end_time === "string" &&
        a.start_time.trim() !== "" &&
        a.end_time.trim() !== ""
    );

    if (validAvailability.length > 0) {
      const insertPayload = validAvailability.map((a) => ({
        coach_profile_id: profile.id,
        day_of_week: a.day_of_week,
        start_time: a.start_time.trim(),
        end_time: a.end_time.trim(),
      }));

      const { error: availabilityError } = await supabase
        .from("coach_availability")
        .insert(insertPayload);

      if (availabilityError)
        throw new Error(
          `Failed to insert availability: ${availabilityError.message}`
        );
    }
  }

  // Handle custom venues: insert them into venues table first
  let customVenueIds: string[] = [];
  if (custom_venues.length > 0) {
    const customVenuesPayload = custom_venues.map((venue) => ({
      venue_name: venue.venue_name,
      address_line: venue.address_line,
      town: venue.town,
      postcode: venue.postcode,
      lat: venue.lat,
      lng: venue.lng,
    }));

    const { data: insertedVenues, error: customVenueError } = await supabase
      .from("venues")
      .insert(customVenuesPayload)
      .select("id");

    if (customVenueError)
      throw new Error(
        `Failed to insert custom venues: ${customVenueError.message}`
      );

    customVenueIds = insertedVenues?.map((v) => v.id) || [];
  }

  // Combine regular venue_ids with custom venue IDs
  const allVenueIds = [...venue_ids, ...customVenueIds];

  // Handle service areas: delete existing and insert new
  const { error: deleteServiceAreasError } = await supabase
    .from("coach_service_areas")
    .delete()
    .eq("coach_id", profile.id);

  if (deleteServiceAreasError)
    throw new Error(
      `Failed to delete existing service areas: ${deleteServiceAreasError.message}`
    );

  if (allVenueIds.length > 0) {
    const { error: venueError } = await supabase
      .from("coach_service_areas")
      .insert(
        allVenueIds.map((venue_id) => ({
          coach_id: profile.id,
          venue_id,
        }))
      );

    if (venueError)
      throw new Error(
        `Failed to insert service areas: ${venueError.message}`
      );
  }

  // Mark coach profile as complete
  const { error: coachUpdateErr } = await supabase
    .from("coaches")
    .update({
      profile_complete: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", profile.id);

  if (coachUpdateErr)
    throw new Error(
      `Failed to update coach profile: ${coachUpdateErr.message}`
    );

  return { success: true };
}
