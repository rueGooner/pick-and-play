import { supabaseServer } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { error } = await supabase
    .from("coaches")
    .update({ is_onboarded: true, stripe_charges_enabled: true, stripe_payouts_enabled: true })
    .eq("id", user.id);

  if (error) {
    return NextResponse.json(
      { error: error.message || "Failed to update onboarded flag" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
