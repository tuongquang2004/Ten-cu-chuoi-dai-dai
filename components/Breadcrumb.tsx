"use client"
import Link from "next/link"
import { RightArrow } from '@/public/assets/icons';

type Crumb = { label: string; href: string };

type BreadcrumbProps = {
  current: string;
  base?: Crumb[];
};

export default function Breadcrumb({
  current,
  base = [
    { label: "Settings", href: "" },
    { label: "Manage Lists", href: "/" },
  ],
}: Readonly<BreadcrumbProps>) {
  return (
    <nav aria-label="Breadcrumb" className="flex gap-2">
      {base.map((c, idx) => (
        <div
          key={c.href + idx}
          className="flex items-center gap-2 text-[#667085] font-semibold font-[Inter]"
        >
          <Link href={c.href}>{c.label}</Link>
          <RightArrow />
        </div>
      ))}
      <div className="flex items-center gap-2 text-[#1D2939] font-semibold font-[Inter]">
        {current}
      </div>
    </nav>
  );
}
