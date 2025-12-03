import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { ensureOnboarding } from "./ensure-onboarding";

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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

    await ensureOnboarding(request, supabase, user.id);
  }

  return supabaseResponse;
}
