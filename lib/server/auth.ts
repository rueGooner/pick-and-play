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

  // this is causing issues after first registration
  // if (profile.role === "coach") {
  //   const { data } = await supabase
  //     .from("coach_info")
  //     .select("*")
  //     .eq("id", profile.id)
  //     .single();

  //   console.log(data);
  //   if (!data) redirect("/dashboard/onboarding");

  //   return {
  //     profile: data,
  //     email: profile.email,
  //   };
  // }

  return { profile, email: user.email };
}
