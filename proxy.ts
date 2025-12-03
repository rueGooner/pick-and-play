import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { updateSession } from "./lib/session";

// Only run on actual app routes, excluding Next.js internals
export const config = {
  matcher: ["/((?!_next/|_proxy/|_vercel|api/|favicon.ico|.*\\..*).*)"],
};

export default async function proxy(request: NextRequest) {
  return await updateSession(request);
}
