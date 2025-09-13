'use client'

import NavBar from './NavBar';
import CommonButton from './CommonButton';
import { useRouter } from 'next/navigation';
import SearchBar from './SearchBar';
import { ROUTES } from '@/constants/routes';
import {Plus, Gear, Question} from '@/public/assets/icons';
import {Logo} from '@/public/assets/logos';

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
      <div className='flex justify-between gap-[44px] items-center'>
        {/* Logo */}
        <button className='cursor-pointer' onClick={() => router.push(ROUTES.ROOT)}><Logo /></button>

        {/* Tabs */}
        <div className='flex items-center'>
          <NavBar items={tabs1} />
          <div className="h-7 w-px bg-[#E4E7EC]"></div>
          <NavBar items={tabs2} />
        </div>
      </div>

      {/* Actions (right) */}
      <div className="ml-auto flex items-center gap-2">
        <CommonButton variant='circle' size='sm' onClick={addItem}><Plus /></CommonButton>

        <SearchBar placeholder='Search' variant='secondary' iconAlign='right' className='min-w-[250px]'/>

        <button className="p-1 text-slate-500 hover:text-slate-900" aria-label="Settings">
          <Gear />
        </button>
        <button className="p-1 text-slate-500 hover:text-slate-900" aria-label="Notifications">
          <Question />
        </button>
        <button onClick={()=>router.push(ROUTES.LOGIN)} className="h-7 cursor-pointer w-7 overflow-hidden rounded-full bg-slate-200 ring-1 ring-slate-300" />
      </div>
    </header>
  )
}
