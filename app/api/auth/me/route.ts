import { NextResponse } from 'next/server'
import { getSessionEmail } from '@/lib/auth'
import { findByEmail } from '@/lib/userStore'

export async function GET() {
  const email = await getSessionEmail()
  const user = email ? await findByEmail(email) : null
  return NextResponse.json(user ? { email: user.email, name: user.name, role: user.role } : null)
}
