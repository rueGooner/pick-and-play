import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: '/((?!api/"_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
};

export default function middleware(request: NextRequest) {
  const url = request.nextUrl;
  let hostname = request.headers.get("host") || "";

  const rootDomain = "pickandplaytennis.co.uk";
  const isLocalhost = hostname.includes("localhost");

  let subdomain = "";
  if (!isLocalhost && hostname.endsWith(`.${rootDomain}`)) {
    subdomain = hostname.replace(`.${rootDomain}`, "").split(".")[0];
  }

  if (
    !subdomain ||
    subdomain === "www" ||
    hostname === rootDomain ||
    isLocalhost
  ) {
    return NextResponse.rewrite(new URL("/home", request.url));
  }

  return NextResponse.rewrite(new URL(`/apps/${subdomain}`, request.url));
}
