import { createHmac, timingSafeEqual } from "node:crypto";

export const adminCookieName = "tech-with-afzarul-admin";
const sessionSecret = () => process.env.ADMIN_SESSION_SECRET || "";
const sign = (payload: string) => createHmac("sha256", sessionSecret()).update(payload).digest("base64url");

export function credentialsConfigured() {
  return Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);
}

export function emailMatches(candidate: string) {
  const expected = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const normalized = candidate.trim().toLowerCase();
  if (!normalized || !expected) return false;
  const left = Buffer.from(normalized);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function passwordMatches(candidate: string) {
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!candidate || !expected) return false;
  const left = Buffer.from(candidate);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function createAdminToken() {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + 1000 * 60 * 60 * 8 })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminToken(token?: string) {
  if (!token || !credentialsConfigured()) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const left = Buffer.from(signature);
  const right = Buffer.from(sign(payload));
  if (left.length !== right.length || !timingSafeEqual(left, right)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as { exp?: number };
    return typeof data.exp === "number" && data.exp > Date.now();
  } catch { return false; }
}
