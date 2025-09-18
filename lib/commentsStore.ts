import { promises as fs } from "fs";
import path from "path";
import { CommentRow } from "@/lib/data";

const dbPath = path.join(process.cwd(), "data", "comments.json");

export async function readComments(): Promise<CommentRow[]> {
  try {
    const buf = await fs.readFile(dbPath, "utf8");
    return JSON.parse(buf || "[]");
  } catch {
    return [];
  }
}

async function writeComments(rows: CommentRow[]) {
  await fs.writeFile(dbPath, JSON.stringify(rows, null, 2), "utf8");
}

export async function addComment(row: CommentRow) {
  const rows = await readComments();
  rows.push(row);
  await writeComments(rows);
  return row;
}

export async function updateComment(row: CommentRow, originalComment?: string) {
  const rows = await readComments();
  const key = String(originalComment ?? row.comment);

  const idx = rows.findIndex(r => String(r.comment) === key);
  if (idx === -1) {
    throw new Error(`Comment "${key}" not found`);
  }

  rows[idx] = row;
  await writeComments(rows);
  return row;
}
