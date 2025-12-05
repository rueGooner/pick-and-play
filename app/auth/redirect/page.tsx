import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";

export default async function AuthRedirect() {
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

  if (!profile) redirect("/onboarding");

  if (profile.role === "coach") {
    const { data: coachInfo } = await supabase
      .from("coach_info")
      .select("profile_complete")
      .eq("id", user.id)
      .maybeSingle();

    const needsOnboarding = !coachInfo || coachInfo.profile_complete !== true;

    if (needsOnboarding) {
      redirect("/dashboard/onboarding");
    }

    // redirect("/dashboard");
  }

  if (profile.role === "player") {
    redirect("/dashboard/player");
  }

  if (profile.role === "admin") {
    redirect("/admin");
  }

  // redirect("/dashboard");
}
