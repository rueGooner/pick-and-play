import { redirect } from "next/navigation";
import { supabaseServer } from "../supabase/server";

export async function getAuthenticatedUser() {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profile.role === "coach") {
    const { data: coachInfo } = await supabase
      .from("coach_info")
      .select("*")
      .eq("id", profile.id)
      .maybeSingle();

    // Merge profile and coachInfo, with coachInfo taking precedence for overlapping fields
    // This ensures profile fields (role, onboarding_step) are always present
    const mergedProfile = coachInfo 
      ? { ...profile, ...coachInfo }
      : profile;

    return {
      profile: mergedProfile,
      email: profile.email,
    };
  }

  return { profile, email: user.email };
}
