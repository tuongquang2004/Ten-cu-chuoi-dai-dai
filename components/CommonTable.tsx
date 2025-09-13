import { ReactNode } from "react"
import { inter } from "@/lib/data";
import { twMerge } from "tailwind-merge";
// import Pagination from "./Pagination";

type TableHeader<T> = {
    label: string,
    key: keyof T,
    headerClassName?: string,
    render?: (row: T) => ReactNode
};

type TableProps<T> = {
    columns: TableHeader<T>[],
    data: T[],
    pagination?: boolean
};

const baseColumnHeader = 'text-start p-[12px]';

export default function CommonTable<T extends object>({ columns, data}: Readonly<TableProps<T>>) {
    return (
        <div className="border border-[#E4E7EC] overflow-hidden rounded-lg">
            <div className="max-h-[740px] overflow-y-auto">
            <table className={`${inter.className} rounded-lg w-full`}>
                <thead>
                    <tr className='border border-[#E4E7EC] border-b border-b-[#98A2B3] text-[#667085] bg-[#E4E7EC]'>
                        {columns.map(c => (
                            <th className={twMerge(baseColumnHeader, c.headerClassName)} key={String(c.key)}>{c.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((d, index) => (
                        <tr className={`border-b-1 border-[#E4E7EC] hover:bg-[#F2F4F7]`} key={index + 1}>
                            {columns.map((c) => (
                                <td className="p-[12px] text-[#1D2939]" key={String(c.key)}>
                                    {c.render ? c.render(d) : d[c.key] as ReactNode}
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