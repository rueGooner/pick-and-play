import { NextRequest, NextResponse } from "next/server";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

export async function ensureOnboarding(
  req: NextRequest,
  supabase: SupabaseClient,
  id: string
) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;

  const url = req.nextUrl.clone();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("id", id)
    .single();

  if (!profile) {
    url.pathname = "/onboarding";
    return NextResponse.redirect(url);
  }

  // 3. COACH ONBOARDING LOGIC
  if (profile.role === "coach") {
    const { data: coachInfo } = await supabase
      .from("coach_info")
      .select("profile_complete")
      .eq("id", profile.id)
      .maybeSingle();

    const isOnboardingPage = pathname.startsWith("/dashboard/onboarding");
    const needsOnboarding = !coachInfo || coachInfo.profile_complete !== true;

    if (needsOnboarding && !!isOnboardingPage) {
      url.pathname = "/dashboard/onboarding";
      return NextResponse.redirect(url);
    }

    if (!needsOnboarding && isOnboardingPage) {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return res;
}
