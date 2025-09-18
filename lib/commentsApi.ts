import { COMMENTS_ENDPOINT } from "@/lib/constants";
import type { CommentRow } from "@/lib/data";

export const fetcher = (url: string) => fetch(url).then(r => r.json());

export type AddCommentPayload = CommentRow;
export type UpdateCommentPayload = CommentRow & { originalComment?: string };

export async function addCommentApi(payload: AddCommentPayload) {
  const res = await fetch(COMMENTS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to add comment");
  return res.json(); 
}

export async function updateCommentApi(payload: UpdateCommentPayload) {
  const res = await fetch(COMMENTS_ENDPOINT, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload), 
  });
  if (!res.ok) throw new Error("Failed to update comment");
  return res.json();
}

export const PANEL_W = 600;
