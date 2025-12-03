import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          supabaseResponse = NextResponse.next({ request });
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

  const { pathname, search } = request.nextUrl;

  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const PROTECTED_PATHS = ["/dashboard", "/coach", "/admin"];

  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));

  const isAuthRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/error");

  if (!user && isProtected && !isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (user && isAuthRoute) {
    const redirect = new URL("/dashboard", request.url);
    return NextResponse.redirect(redirect);
  }

  if (user) {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, role")
      .eq("id", user.id)
      .maybeSingle();

    if (!profile && !profileError) {
      await supabase.from("profiles").insert({
        id: user.id,
        email: user.email,
        firstname: user.user_metadata?.first_name ?? "New",
        lastname: user.user_metadata?.last_name ?? "User",
        role: "player",
      });
    }

    console.log("PROFILE", profile);

    if (profile?.role === "coach") {
      const { data: coachProfile } = await supabase
        .from("coach_profiles")
        .select("is_onboarded, profile_complete")
        .eq("id", user.id)
        .maybeSingle();

      const onOnboardingPage = pathname.startsWith(
        "/dashboard/coach/onboarding"
      );

      if (coachProfile && coachProfile.profile_complete === false) {
        if (!onOnboardingPage) {
          const url = request.nextUrl.clone();
          url.pathname = "/dashboard/coach/onboarding";
          return NextResponse.redirect(url);
        }
      }

      if (coachProfile && coachProfile.profile_complete === true) {
        if (onOnboardingPage) {
          const url = request.nextUrl.clone();
          url.pathname = "/dashboard/coach";
          return NextResponse.redirect(url);
        }
      }
    }
  }

  return supabaseResponse;
}
