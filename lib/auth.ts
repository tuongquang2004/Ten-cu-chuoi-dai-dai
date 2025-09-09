import { cookies } from 'next/headers'

const cookieName = 'sessionEmail'

export async function setSession(email: string) {
  (await cookies()).set(cookieName, email, { httpOnly: true, path: '/' })
}

export async function getSessionEmail(): Promise<string | null> {
  return (await cookies()).get(cookieName)?.value || null
}

export async function clearSession() {
  (await cookies()).set(cookieName, '', { path: '/', maxAge: 0 })
}
