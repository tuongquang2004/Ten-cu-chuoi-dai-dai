"use client"

import { ReactNode, useState } from "react"
import { inter } from "@/lib/data"
import { cn } from "@/app/cn"

type TableHeader<T> = {
    label: string
    key: keyof T
    headerClassName?: string
    render?: (row: T) => ReactNode
}

type TableProps<T> = {
    columns: TableHeader<T>[]
    data: T[]
    onRowClick?: (row: T) => void
}

export default function CommonTable<T extends { id: string }>({
    columns,
    data,
    onRowClick
}: Readonly<TableProps<T>>) {
    const [selectedRow, setSelectedRow] = useState<string>("")

    const baseColumnHeader = "text-start p-[12px]"
    const baseRow = cn(
        "border-b border-[#E4E7EC] hover:bg-[#F2F4F7]",
        onRowClick && "cursor-pointer"
    )

    return (
        <div className="border border-[#E4E7EC] overflow-hidden rounded-lg">
            <div className="max-h-[740px] overflow-y-auto">
                <table className={cn(inter.className, "rounded-lg w-full")}>
                    <thead>
                        <tr className="border border-[#E4E7EC] border-b border-b-[#98A2B3] text-[#667085] bg-[#E4E7EC]">
                            {columns.map((c) => (
                                <th
                                    className={cn(baseColumnHeader, c.headerClassName)}
                                    key={String(c.key)}
                                >
                                    {c.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d, index) => (
                            <tr
                                key={index + 1}
                                onClick={() => {
                                    onRowClick?.(d)
                                    setSelectedRow(d.id)
                                }}
                                className={cn(
                                    baseRow,
                                    d.id === selectedRow && "bg-[#F2F4F7]"
                                )}
                            >
                                {columns.map((c) => (
                                    <td
                                        className="text-[#1D2939]"
                                        key={String(c.key)}
                                    >
                                        {c.render ? (
                                            c.render(d)
                                        ) : (
                                            <div
                                                className={cn(
                                                    "p-[12px]",
                                                    d.id === selectedRow &&
                                                    "font-[600] pl-[16px]"
                                                )}
                                            >
                                                {d[c.key] as ReactNode}
                                            </div>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export function createColumns<T extends object>() {
    return <U extends TableHeader<T>[]>(cols: U) => cols
}
