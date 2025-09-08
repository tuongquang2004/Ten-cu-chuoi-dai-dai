import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Datapel',
  description: 'Admin shell with reusable components',
}

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
