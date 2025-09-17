"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import {
  Users,
  Location,
  Coins,
  ManageLists,
  Contact,
  Inventory,
  Sales,
  Purchases,
  Transfers,
  Despatch,
  UserFields,
  Barcode,
  Company,
  SecurityLock,
  Adaptors,
  Pos,
  About,
} from "@/public/assets/icons";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type MenuItem = { label: string; icon: ReactNode; href: string };

const items: MenuItem[] = [
  { label: "Users", icon: <Users />, href: "#" },
  { label: "Locations", icon: <Location />, href: "#" },
  { label: "Import / Export", icon: <Coins />, href: "#" },
  { label: "Manage Lists", icon: <ManageLists />, href: "/" },
  { label: "Contact", icon: <Contact />, href: "#" },
  { label: "Inventory", icon: <Inventory />, href: "#" },
  { label: "Sales", icon: <Sales />, href: "#" },
  { label: "Purchases", icon: <Purchases />, href: "#" },
  { label: "Transfers / Checkouts", icon: <Transfers />, href: "#" },
  { label: "Despatch", icon: <Despatch />, href: "#" },
  { label: "User Fields", icon: <UserFields />, href: "#" },
  { label: "Barcodes / Labels", icon: <Barcode />, href: "#" },
  { label: "Company", icon: <Company />, href: "#" },
  { label: "Security", icon: <SecurityLock />, href: "#" },
  { label: "Adaptors", icon: <Adaptors />, href: "#" },
  { label: "PoS", icon: <Pos />, href: "#" },
  { label: "About", icon: <About />, href: "#" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className={`${inter.className} hidden md:block w-[240px] shrink-0 bg-[#F2F4F7] border-r border-[#D0D5DD] min-h-full`}
    >
      <ul className="space-y-2 px-3 py-8 text-sm">
        {items.map((i) => {
          const active = i.href !== "#" && pathname === i.href;
          return (
            <li key={i.label}>
              <Link
                href={i.href}
                className={
                  "flex items-center gap-2 rounded px-2 py-1.5 " +
                  (active
                    ? "bg-white text-[#1D2939]"
                    : "text-[#475467] hover:bg-white hover:text-[#1D2939]")
                }
              >
                <span className="shrink-0">{i.icon}</span>
                <span>{i.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
