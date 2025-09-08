// lib/data.ts
export type IconKey =
  | 'Referral' | 'Truck' | 'Bag' | 'Briefcase' | 'Exchange' | 'Note' | 'Tag'

export type TileItemData = { label: string; icon: IconKey; href?: string }

export const manageTiles: TileItemData[] = [
  { label: 'Referral Sources',         icon: 'Referral' },
  { label: 'Shipping Methods',         icon: 'Truck' },
  { label: 'Payment Methods',          icon: 'Bag' },
  { label: 'Job Numbers',              icon: 'Briefcase' },
  { label: 'Exchange Rates',           icon: 'Exchange' },
  { label: 'Comments',                 icon: 'Note' },
  { label: 'Special Pricing Schedule', icon: 'Tag' },
]
