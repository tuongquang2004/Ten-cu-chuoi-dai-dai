import { NextResponse } from "next/server";
import { readUsers, createUser } from "@/lib/userStore";

export async function GET() {
  const users = await readUsers();
  return NextResponse.json(users.map(({ password, ...u }) => u));
}

export async function POST(req: Request) {
  const body = await req.json();
  const u = await createUser(body);
  const { password, ...safe } = u;
  return NextResponse.json(safe, { status: 201 });
}
