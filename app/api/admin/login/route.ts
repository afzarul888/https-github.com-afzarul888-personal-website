import { NextResponse } from "next/server";
import { adminCookieName, createAdminToken, credentialsConfigured, emailMatches, passwordMatches } from "../../../lib/adminAuth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get("email") || "");
  const password = String(form.get("password") || "");
  const allowed = credentialsConfigured() && emailMatches(email) && passwordMatches(password);
  const response = NextResponse.redirect(new URL(allowed ? "/admin" : `/admin/login?error=${credentialsConfigured() ? "invalid" : "config"}`, request.url), 303);
  if (allowed) response.cookies.set(adminCookieName, createAdminToken(), { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 8 });
  return response;
}
