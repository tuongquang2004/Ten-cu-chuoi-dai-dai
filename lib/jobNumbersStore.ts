import { promises as fs } from "fs";
import path from "path";
import { JobNumberRow } from "@/lib/data";

const dbPath = path.join(process.cwd(), "data", "job_numbers.json");

export async function readJobNumbers(): Promise<JobNumberRow[]> {
  try {
    const buf = await fs.readFile(dbPath, "utf8");
    return JSON.parse(buf || "[]");
  } catch {
    return [];
  }
}

async function writeJobNumbers(rows: JobNumberRow[]) {
  await fs.writeFile(dbPath, JSON.stringify(rows, null, 2), "utf8");
}

export async function addJobNumber(row: JobNumberRow) {
  const rows = await readJobNumbers();
  rows.push(row);
  await writeJobNumbers(rows);
  return row;
}
