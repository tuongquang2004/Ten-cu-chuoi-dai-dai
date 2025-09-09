'use client'
import Link from 'next/link'
import { Icon } from './Icon'
import NavBar from './NavBar';
import CommonButton from './CommonButton';
import { useRouter } from 'next/navigation';

type NavItem = { label: string; route: string }

const tabs: NavItem[] = [
  { label: 'Dashboard', route: '/' },
  { label: 'Purchases', route: '/' },
  { label: 'Receiving', route: '/' },
  { label: 'Assemblies', route: '/' },
  { label: 'Transfers', route: '/' },
  { label: 'Sales', route: '/' },
  { label: 'Despatch', route: '/' },
  { label: 'Inventory', route: '/' },
  { label: 'Contacts', route: '/' },
  { label: 'Reports', route: '/' },
]

const addItem = () => {
  alert('You clicked a button :D');
}

const tabs1 = tabs.slice(0, 7);
const tabs2 = tabs.slice(7);


export default function TopNav() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 flex h-12 items-center justify-between border-b border-[#D0D5DD] bg-white px-[38px] py-8">
      <div className='flex justify-between gap-[64px] items-center'>
        {/* Logo */}
        <button className='cursor-pointer' onClick={() => router.push('/')}><Icon.Logo /></button>

        {/* Tabs */}
        <div className='flex items-center'>
          <NavBar config={tabs1} />
          <div className="h-7 w-px bg-[#E4E7EC]"></div>
          <NavBar config={tabs2} />
        </div>
      </div>

      {/* Actions (right) */}
      <div className="ml-auto flex items-center gap-2">
        <button
          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-white"
          aria-label="New"
        >
          <Icon.Plus />
        </button>
        <CommonButton variant='circle'><Icon.Plus2 /></CommonButton>

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
          <Icon.Question />
        </button>
        <div className="h-7 w-7 overflow-hidden rounded-full bg-slate-200 ring-1 ring-slate-300" />
      </div>
    </header>
  )
}
