import { Inter } from "next/font/google";

export type IconKey =
  | 'Referral' | 'Truck' | 'Bag' | 'Briefcase' | 'Exchange' | 'Note' | 'Tag'

export type TileItemData = { label: string; icon: IconKey; href?: string }

export const manageTiles: TileItemData[] = [
  { label: 'Referral Sources', icon: 'Referral', href: '/referral_sources' },
  { label: 'Shipping Methods', icon: 'Truck', href: '/' },
  { label: 'Payment Methods', icon: 'Bag', href: '/' },
  { label: 'Job Numbers', icon: 'Briefcase', href: '/job_numbers' },
  { label: 'Exchange Rates', icon: 'Exchange', href: '/' },
  { label: 'Comments', icon: 'Note', href: '/' },
  { label: 'Special Pricing Schedule', icon: 'Tag', href: '/' },
]

export type check = {
  key: string,
  label: string,
  status: boolean
}

export type RefSrc = {
  source: string,
  isActive: boolean
}

export type JobNumberRow = {
  jobnumber: string;
  level: number,
  name: string;
  startdate: string;
  enddate: string;
  isActive: boolean;
  description: string;
  customer: string;
  contact: string;
  other: string;
  completed: string;
};

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});