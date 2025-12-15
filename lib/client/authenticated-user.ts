'use client';

import { supabaseClient } from "../supabase/client";

export async function getClientAuthenticatedUser() {
  const supabase = await supabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profile.role === "coach") {
    const { data } = await supabase
      .from("coach_info")
      .select("*")
      .eq("id", profile.id)
      .single();

    return {
      profile: data,
      email: profile.email,
    };
  }

  return { supabase, profile, email: user.email };
}
