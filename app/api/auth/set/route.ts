import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function POST(req: Request) {
  const requestCookies = await cookies();
  const { session } = await req.json();

  const response = NextResponse.json({ ok: true });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => requestCookies.getAll(),
        setAll: (newCookies) => {
          for (const { name, value, options } of newCookies) {
            response.cookies.set(name, value, options);
          }
        },
      },
    }
  );

  if (session) {
    await supabase.auth.setSession(session);
  } else {
    await supabase.auth.signOut();
  }

  return response;
}
