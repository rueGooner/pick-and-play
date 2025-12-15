import { supabaseServer } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  try {
    const supabase = await supabaseServer();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // get the coach profile
    const { data: coach } = await supabase
      .from("coaches")
      .select("stripe_account_id")
      .eq("id", user.id)
      .single();

    let accountId = coach?.stripe_account_id;

    // 1. If no account exists → create one
    if (!accountId) {
      const account = await stripe.accounts.create({
        type: "express",
      });

      accountId = account.id;

      // save to DB
      await supabase
        .from("coaches")
        .update({ stripe_account_id: accountId })
        .eq("id", user.id);
    }

    // 2. Generate onboarding link
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/coach`,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/coach`,
      type: "account_onboarding",
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (err: unknown) {
    console.error("STRIPE ERROR:", err);
    return NextResponse.json(
      { error: (err as Error).message || "Stripe account onboarding failed" },
      { status: 500 }
    );
  }
}