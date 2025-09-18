import { promises as fs } from "fs";
import path from "path";

export type UserRow = {
  id: string;
  email: string;
  name: string;
  role: string;
  password: string;
};

const dbPath = path.join(process.cwd(), "data", "users.json");

export async function readUsers(): Promise<UserRow[]> {
  // fs.readFile
  const buf = await fs.readFile(dbPath, "utf8");
  return JSON.parse(buf || "[]");
}

export async function writeUsers(users: UserRow[]) {
  // fs.writeFile
  await fs.writeFile(dbPath, JSON.stringify(users, null, 2), "utf8");
}

export async function findByEmail(email: string) {
  const users = await readUsers();
  return (
    users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null
  );
}

export async function findById(id: string) {
  const users = await readUsers();
  return users.find((u) => u.id === id) || null;
}

export async function createUser(u: Omit<UserRow, "id">) {
  const users = await readUsers();
  const id = `u_${Date.now()}`;
  users.push({ id, ...u });
  await writeUsers(users);
  return { id, ...u };
}

export async function updateUser(
  id: string,
  patch: Partial<Omit<UserRow, "id">>,
) {
  const users = await readUsers();
  const i = users.findIndex((u) => u.id === id);
  if (i === -1) return null;
  users[i] = { ...users[i], ...patch };
  await writeUsers(users);
  return users[i];
}

export async function deleteUser(id: string) {
  const users = await readUsers();
  const next = users.filter((u) => u.id !== id);
  await writeUsers(next);
  return users.length !== next.length;
}
