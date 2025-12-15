import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET() {
  try {
    const supabase = await supabaseServer();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // fetch coach stripe id
    const { data: coach } = await supabase
      .from("coaches")
      .select("stripe_account_id")
      .eq("id", user.id)
      .single();

    if (!coach?.stripe_account_id) {
      return NextResponse.json({ onboarded: false });
    }

    // fetch from Stripe
    const account = await stripe.accounts.retrieve(coach.stripe_account_id);

    const isEnabled =
      account.details_submitted &&
      account.charges_enabled &&
      account.payouts_enabled;

    return NextResponse.json({ onboarded: isEnabled });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message || "Stripe status check failed" },
      { status: 500 }
    );
  }
}
