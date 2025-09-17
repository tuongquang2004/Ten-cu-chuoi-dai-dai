import { NextResponse } from "next/server";
import { findById, updateUser, deleteUser } from "@/lib/userStore";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const u = await findById(params.id);
  if (!u) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const { password, ...safe } = u;
  return NextResponse.json(safe);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const patch = await req.json();
  const u = await updateUser(params.id, patch);
  if (!u) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const { password, ...safe } = u;
  return NextResponse.json(safe);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } },
) {
  const ok = await deleteUser(params.id);
  return NextResponse.json({ ok });
}
