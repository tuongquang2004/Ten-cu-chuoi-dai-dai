import { Exchange, Job, Payment, Referral, Shipping, Comment, Tag } from "@/public/assets/icons";
import { ROUTES } from '@/constants/routes';

export type TileItemData = { label: string; icon: React.ReactNode; href?: string }

export const manageTiles: TileItemData[] = [
  { label: 'Referral Sources', icon: <Referral />, href: ROUTES.REFERRAL_SOURCES },
  { label: 'Shipping Methods', icon: <Shipping />, href: '/' },
  { label: 'Payment Methods', icon: <Payment />, href: '/' },
  { label: 'Job Numbers', icon: <Job />, href: '/job_numbers' },
  { label: 'Exchange Rates', icon: <Exchange />, href: '/' },
  { label: 'Comments', icon: <Comment />, href: '/' },
  { label: 'Special Pricing Schedule', icon: <Tag />, href: '/' },
]