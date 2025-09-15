import { promises as fs } from "fs";
import path from "path";
import { JobNumberRow } from "@/constants/types"; 

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

export async function updateJobNumber(row: JobNumberRow, originalJobnumber?: string) {
  const rows = await readJobNumbers();
  const key = (originalJobnumber ?? row.jobnumber).toString().padStart(3, "0");

  const idx = rows.findIndex(r => (r.jobnumber ?? "").toString().padStart(3, "0") === key);
  if (idx === -1) {
    throw new Error(`JobNumber ${key} not found`);
  }

  rows[idx] = row;
  await writeJobNumbers(rows);
  return row;
}