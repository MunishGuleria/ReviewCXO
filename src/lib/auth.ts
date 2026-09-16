import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import supabase from "./db";
import crypto from "crypto";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || process.env.ADMIN_AUTH_TOKEN || "fallback-dev-secret-change-in-production"
);
const ALG = "HS256";

export interface UserPayload {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
}

const ADMIN_EMAILS = ["harsh078976@gmail.com"];

export function isAdmin(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function findUserByEmail(email: string) {
  const { data } = await supabase
    .from("users")
    .select("id, email, name, password_hash, role, created_at")
    .eq("email", email.toLowerCase())
    .single();
  return data || undefined;
}

export async function findUserById(id: string) {
  const { data } = await supabase
    .from("users")
    .select("id, email, name, role")
    .eq("id", id)
    .single();
  return data || undefined;
}

export async function createUser(email: string, name: string, passwordHash: string) {
  const id = `user-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
  const role = isAdmin(email) ? "admin" : "user";
  await supabase.from("users").insert({
    id,
    email: email.toLowerCase(),
    name,
    password_hash: passwordHash,
    role,
  });
  return { id, email: email.toLowerCase(), name, role: role as "user" | "admin" };
}

export async function createToken(user: UserPayload): Promise<string> {
  return new SignJWT({ ...user })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET);
}

export async function verifyToken(token: string): Promise<UserPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET, { algorithms: [ALG] });
    return {
      id: payload.id as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as "user" | "admin",
    };
  } catch {
    return null;
  }
}
