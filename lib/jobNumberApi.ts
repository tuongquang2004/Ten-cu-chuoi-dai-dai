import { JOB_NUMBERS_ENDPOINT} from "@/lib/constants";

export const fetcher = (url: string) => fetch(url).then(r => r.json());

export const addJobNumberApi = (payload: unknown) =>
  fetch(JOB_NUMBERS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

export const updateJobNumberApi = (payload: unknown) =>
  fetch(JOB_NUMBERS_ENDPOINT, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

export const PANEL_W = 600;
