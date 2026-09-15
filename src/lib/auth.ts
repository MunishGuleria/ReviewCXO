import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import db from "./db";
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

export function findUserByEmail(email: string) {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email.toLowerCase()) as
    | { id: string; email: string; name: string; password_hash: string; role: string; created_at: string }
    | undefined;
}

export function findUserById(id: string) {
  return db.prepare("SELECT id, email, name, role FROM users WHERE id = ?").get(id) as
    | { id: string; email: string; name: string; role: string }
    | undefined;
}

export function createUser(email: string, name: string, passwordHash: string) {
  const id = `user-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
  const role = isAdmin(email) ? "admin" : "user";
  db.prepare("INSERT INTO users (id, email, name, password_hash, role) VALUES (?, ?, ?, ?, ?)").run(
    id,
    email.toLowerCase(),
    name,
    passwordHash,
    role
  );
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
