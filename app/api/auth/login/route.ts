import { NextResponse } from 'next/server'
import { findByEmail } from '@/lib/userStore'
import { setSession } from '@/lib/auth'

export async function POST(req: Request) {
  const { email, password } = await req.json()
  if (!email || !password) return NextResponse.json({ error: 'Missing' }, { status: 400 })

  const user = await findByEmail(email)
  if (!user || user.password !== password) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
  setSession(user.email)
  return NextResponse.json({ ok: true })
}
