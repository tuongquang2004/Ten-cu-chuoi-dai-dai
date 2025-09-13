import { NextResponse } from "next/server";
import { addJobNumber, readJobNumbers, updateJobNumber } from "@/lib/jobNumbersStore";

export async function GET() {
  const rows = await readJobNumbers();
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const body = await req.json();
  const row = {
    jobnumber: String(body.jobnumber ?? "").padStart(3, "0"),
    level: Number(body.level ?? 1),
    name: String(body.name ?? ""),
    startdate: String(body.startdate ?? ""),
    enddate: String(body.enddate ?? ""),
    isActive: body.isActive === true || body.isActive === "true",
    description: String(body.jobnumber ?? ""),
    customer: String(body.jobnumber ?? ""),
    contact: String(body.jobnumber ?? ""),
    other: String(body.jobnumber ?? ""),
    completed: String(body.jobnumber ?? ""),
  };

  const created = await addJobNumber(row);
  return NextResponse.json(created, { status: 201 });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const originalJobnumber = String(body.originalJobnumber ?? body.jobnumber ?? "").padStart(3, "0");

  const row = {
    jobnumber: String(body.jobnumber ?? "").padStart(3, "0"),
    level: Number(body.level ?? 1),
    name: String(body.name ?? ""),
    startdate: String(body.startdate ?? ""),
    enddate: String(body.enddate ?? ""),
    isActive: body.isActive === true || body.isActive === "true",
    description: String(body.description ?? ""),
    customer: String(body.customer ?? ""),
    contact: String(body.contact ?? ""),
    other: String(body.other ?? ""),
    completed: String(body.completed ?? ""),
  };

  const updated = await updateJobNumber(row, originalJobnumber);
  return NextResponse.json(updated);
}