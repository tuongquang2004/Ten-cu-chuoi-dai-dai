'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from './Icon'
import { Inter } from 'next/font/google'

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
  })

type IconKey = keyof typeof Icon
type MenuItem = { label: string; icon: IconKey; href: string }

const items: MenuItem[] = [
  { label: 'Users',                 icon: 'Users',      href: '#' },
  { label: 'Locations',             icon: 'Location',   href: '#' },
  { label: 'Import / Export',       icon: 'Coins',      href: '#' },
  { label: 'Manage Lists',          icon: 'ManageLists',       href: '/' },
  { label: 'Contact',               icon: 'Contact',       href: '#' },
  { label: 'Inventory',             icon: 'Inventory',   href: '#' },
  { label: 'Sales',                 icon: 'Sales',        href: '#' },
  { label: 'Purchases',             icon: 'Purchases',       href: '#' },
  { label: 'Transfers / Checkouts', icon: 'Tranfers',href: '#' },
  { label: 'Despatch',              icon: 'Despatch',      href: '#' },
  { label: 'User Fields',           icon: 'UserFields',       href: '#' },
  { label: 'Barcodes / Labels',     icon: 'Barcode',    href: '#' },
  { label: 'Company',               icon: 'Company',  href: '#' },
  { label: 'Security',              icon: 'SecurityLock',     href: '#' },
  { label: 'Adaptors',              icon: 'Adaptors',        href: '#' },
  { label: 'PoS',                   icon: 'POS',       href: '#' },
  { label: 'About',                 icon: 'About',       href: '#' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className={`${inter.className} hidden md:block w-[240px] shrink-0 bg-[#F2F4F7] border-r border-[#D0D5DD] h-screen`}>
      <ul className="space-y-6 px-3 py-8 text-sm">
        {items.map(i => {
          const Svg = Icon[i.icon]
          const active = i.href !== '#' && pathname === i.href
          return (
            <li key={i.label}>
              <Link
                href={i.href}
                className={
                  'flex items-center gap-2 rounded px-2 py-1.5 ' +
                  (active
                    ? 'bg-white text-[#1D2939]'
                    : 'text-[#475467] hover:bg-white hover:text-[#1D2939]')
                }
              >
                <span className="shrink-0"><Svg /></span>
                <span>{i.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
