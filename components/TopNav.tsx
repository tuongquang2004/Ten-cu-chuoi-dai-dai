'use client'
import Link from 'next/link'
import { Icon } from './Icon'
import NavBar from './NavBar';
import CommonButton from './CommonButton';

type NavItem = { label: string; route: string, color: string, hover: any }

const baseColor = '#252C88';
const hover = 'hover:underline hover:underline-offset-1';

const tabs: NavItem[] = [
  { label: 'Dashboard', route: '/', color: baseColor, hover: hover },
  { label: 'Purchases', route: '/', color: baseColor, hover: hover },
  { label: 'Receiving', route: '/', color: baseColor, hover: hover },
  { label: 'Assemblies', route: '/', color: baseColor, hover: hover },
  { label: 'Transfers', route: '/', color: baseColor, hover: hover },
  { label: 'Sales', route: '/', color: baseColor, hover: hover },
  { label: 'Despatch', route: '/', color: baseColor, hover: hover },
  { label: 'Inventory', route: '/', color: baseColor, hover: hover },
  { label: 'Contacts', route: '/', color: baseColor, hover: hover },
  { label: 'Reports', route: '/', color: baseColor, hover: hover },
]

const addItem=()=>{
  alert('You clicked a button :D');
}

const plusButton = {
  text: '+',
  color: 'text-white',
  background: 'bg-[#2F3680]',
  border:{radius:'rounded-full w-10 h-10'},
  onClick: addItem,
  size:'text-[1.5rem]'
};

const tabs1 = tabs.slice(0, 7);
const tabs2 = tabs.slice(7);

export default function TopNav() {
  return (
    <header className="sticky top-0 z-40 flex h-12 items-center justify-between border-b border-[#D0D5DD] bg-white px-[38px] py-8">
      <div className='flex justify-between gap-[64px] items-center'>
        {/* Logo */}
        <button className='cursor-pointer'><Icon.Logo /></button>

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
        <CommonButton config={plusButton}/>

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
