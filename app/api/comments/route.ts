import { NextResponse } from "next/server";
import { readComments, addComment, updateComment } from "@/lib/commentsStore";
import { CommentRow } from "@/lib/data";

export async function GET() {
  const rows = await readComments();
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<CommentRow>;
  const row: CommentRow = {
    comment: String(body.comment ?? "").trim(),
    isActive: String(body.isActive) === "true",
  };
  const created = await addComment(row);
  return NextResponse.json(created, { status: 201 });
}

export async function PUT(req: Request) {
  const body = (await req.json()) as CommentRow & { originalComment?: string };
  const row: CommentRow = {
    comment: String(body.comment ?? "").trim(), 
    isActive: body.isActive === true || String(body.isActive) === "true",
  };

  const originalComment = String(body.originalComment ?? body.comment ?? "");
  const updated = await updateComment(row, originalComment);
  return NextResponse.json(updated);
}