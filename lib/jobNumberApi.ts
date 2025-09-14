import { JobNumberRow } from "@/lib/data";

export const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const PANEL_W = 600;

export async function addJobNumberApi(payload: JobNumberRow) {
  await fetch("/api/job_numbers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function updateJobNumberApi(payload: JobNumberRow) {
  await fetch("/api/job_numbers", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
