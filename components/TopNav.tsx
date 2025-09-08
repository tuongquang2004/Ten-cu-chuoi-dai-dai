'use client'
import Link from 'next/link'
import { Icon } from './Icon'

type NavItem = { label: string; href: string }

const tabs: NavItem[] = [
  { label: 'Dashboard',  href: '#' },
  { label: 'Purchases',  href: '#' },
  { label: 'Receiving',  href: '#' },
  { label: 'Assemblies', href: '#' },
  { label: 'Transfers',  href: '#' },
  { label: 'Sales',      href: '#' },
  { label: 'Despatch',   href: '#' },
  { label: 'Inventory',  href: '#' },
  { label: 'Contacts',   href: '#' },
  { label: 'Reports',    href: '#' },
]

export default function TopNav() {
  return (
    <header className="sticky top-0 z-40 flex h-12 items-center gap-4 border-b border-[#D0D5DD] bg-white px-4">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded bg-brand-600" />
        <span className="text-sm font-semibold">datapel</span>
      </div>

      {/* Tabs */}
      <nav className="hidden md:flex items-center gap-4 text-sm text-slate-600">
        {tabs.map(t => (
          <Link key={t.label} href={t.href} className="hover:text-slate-900">
            {t.label}
          </Link>
        ))}
      </nav>

      {/* Actions (right) */}
      <div className="ml-auto flex items-center gap-2">
        <button
          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-white"
          aria-label="New"
        >
          <Icon.Plus />
        </button>

        <div className="relative">
          <Icon.Search className="absolute left-2 top-1.5 h-4 w-4 text-slate-400" />
          <input
            className="h-8 w-52 rounded border pl-7 pr-2 text-sm outline-none focus:ring-2 focus:ring-brand-600/40"
            placeholder="Search"
          />
        </div>

        <button className="p-1 text-slate-500 hover:text-slate-900" aria-label="Settings">
          <Icon.Gear />
        </button>
        <button className="p-1 text-slate-500 hover:text-slate-900" aria-label="Notifications">
          <Icon.Bell />
        </button>
        <div className="h-7 w-7 overflow-hidden rounded-full bg-slate-200 ring-1 ring-slate-300" />
      </div>
    </header>
  )
}
