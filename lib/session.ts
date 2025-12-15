import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();
  const { pathname } = url;

  // 1. Skip API routes
  if (pathname.startsWith("/api/")) {
    return supabaseResponse;
  }

  const PROTECTED_PATHS = ["/dashboard", "/coach", "/admin"];
  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));

  const isAuthRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/error");

  const isOnboardingPage = pathname.startsWith("/dashboard/onboarding");

  // 2. Not logged in: block protected pages
  if (!user && isProtected && !isAuthRoute) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 3. If no user, nothing more to do
  if (!user) {
    return supabaseResponse;
  }

  // 4. We *do* have a user → get their profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("id", user.id)
    .maybeSingle();

  // Create a basic profile if it doesn't exist yet
  if (!profile) {
    await supabase.from("profiles").insert({
      id: user.id,
      email: user.email,
      firstname: user.user_metadata?.first_name ?? "New",
      lastname: user.user_metadata?.last_name ?? "User",
      role: "player",
    });

    // Treat as player for this request
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // 5. Coach onboarding logic
  if (profile.role === "coach") {
    const { data: coachInfo } = await supabase
      .from("coach_info")
      .select("profile_complete")
      .eq("id", profile.id)
      .maybeSingle();

    const needsOnboarding = !coachInfo || coachInfo.profile_complete !== true;

    // a) If coach needs onboarding and is NOT already on onboarding → send them there
    if (needsOnboarding && !isOnboardingPage) {
      url.pathname = "/dashboard/onboarding";
      return NextResponse.redirect(url);
    }

    // b) If coach is done onboarding but is on onboarding page → send to dashboard
    if (!needsOnboarding && isOnboardingPage) {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    // c) If coach is on an auth route (/login, /auth) → send to correct spot
    if (isAuthRoute) {
      url.pathname = needsOnboarding ? "/dashboard/onboarding" : "/dashboard";
      return NextResponse.redirect(url);
    }

    // Otherwise, allow through (including when coach is on onboarding page and needs onboarding)
    return supabaseResponse;
  }

  // 6. Non-coach roles (player/admin/etc.)
  // Only redirect if on auth routes, not if already on dashboard or onboarding
  if (isAuthRoute) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
