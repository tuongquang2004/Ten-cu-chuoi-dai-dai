"use client"
import Link from "next/link"
import { Icon } from "./Icon"

type Crumb = {
    label: string,
    href: string
}

type BreadcrumbProps = {
    readonly crumbs: Array<Crumb>
}

export default function Breadcrumb({ crumbs }: BreadcrumbProps) {
    return (
        <div className="flex gap-2">
            {crumbs.map((c, index) => index !== crumbs.length - 1 ? (
                <div
                    key={index + 1}
                    className="flex items-center gap-2 text-[#667085] font-semibold font-[Inter]"
                >
                    <Link className="" href={c.href}>{c.label}</Link>
                    <Icon.RightArrow />
                </div>
            ) : (
                <div
                    key={index + 1}
                    className="flex items-center gap-2 text-[#1D2939] font-semibold font-[Inter]"
                >
                    <Link className="" href={'/'}>{c.label}</Link>
                </div>
            ))}
        </div>
    )
}