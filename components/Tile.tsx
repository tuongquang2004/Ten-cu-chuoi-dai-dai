'use client'
import Link from 'next/link'
import type { TileItem } from '@/constants/types'

export function Tile({ icon, label, href, onClick }: TileItem) {
  const content = (
    <div className="group flex flex-wrap w-44 flex-col items-center gap-[10px] bg-white px-4 py-5 text-[14px]">
      <span className="text-slate-600 group-hover:text-slate-900">{icon}</span>
      <span className="font-medium text-slate-700 group-hover:text-slate-900 text-center">{label}</span>
    </div>
  )
  return href ? <Link href={href}>{content}</Link> : <button onClick={onClick}>{content}</button>
}
