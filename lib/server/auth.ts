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

  return { profile, email: user.email };
}
