import { NextResponse } from "next/server";
import { createUser, findByEmail } from "@/lib/userStore";

export async function POST(req: Request) {
  const { email, password, name, role = "user" } = await req.json();
  if (!email || !password || !name)
    return NextResponse.json({ error: "Missing" }, { status: 400 });
  if (await findByEmail(email))
    return NextResponse.json({ error: "Email exists" }, { status: 409 });

  const u = await createUser({ email, password, name, role });
  return NextResponse.json({ id: u.id, email: u.email });
}
