import { Exchange, Job, Payment, Referral, Shipping, Comment, Tag } from "@/public/assets/icons";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

export type TileItemData = { label: string; icon: React.ReactNode; href?: string }

export const manageTiles: TileItemData[] = [
  { label: 'Referral Sources', icon: <Referral />, href: '/referral_sources' },
  { label: 'Shipping Methods', icon: <Shipping />, href: '/' },
  { label: 'Payment Methods', icon: <Payment />, href: '/' },
  { label: 'Job Numbers', icon: <Job />, href: '/job_numbers' },
  { label: 'Exchange Rates', icon: <Exchange />, href: '/' },
  { label: 'Comments', icon: <Comment />, href: '/comments' },
  { label: 'Special Pricing Schedule', icon: <Tag />, href: '/' },
]

export type check = {
  key: string,
  label: string,
  status: boolean
}

export type RefSrc = {
  id: string,
  source: string,
  isActive: boolean
}

export type FormProps = {
  label: string,
  buttonLabel: string,
  statusCheckbox?: {
    className?: string,
    current: boolean,
    onChange: (checked: boolean) => void;
  }
  action: '' | 'add' | 'edit'
}

export const defaultRefSrc = {
  id: "",
  isActive: true,
  source: "",
}

export const defaultForm: FormProps = {
  label: "Form",
  buttonLabel: "Submit",
  action: ""
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

export type CommentRow = {
  comment: string;
  isActive: boolean;
};

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const Madani = localFont({
  src: "../public/fonts/MadaniArabic-Medium.ttf"
});