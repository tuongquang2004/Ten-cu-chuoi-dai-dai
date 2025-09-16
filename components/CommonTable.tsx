import { ReactNode, useState } from "react"
import { inter } from "@/constants/fonts";
import Pagination from "./Pagination";
import { cn } from "@/app/cn";

type TableHeader<T> = {
    label: string,
    key: keyof T,
    headerClassName?: string,
    render?: (row: T) => ReactNode
};

type TableProps<T> = {
    columns: TableHeader<T>[],
    data: T[],
    onRowClick?: (row: T) => void,
    pagination?: boolean,
    selectedId?: string
};

const baseColumnHeader = 'text-start p-[12px]';

export default function CommonTable<T extends { id: string }>({
    columns,
    data,
    onRowClick,
    pagination = false,
    selectedId
}: Readonly<TableProps<T>>) {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const pageCount = Math.ceil(data.length / perPage);

    const paginatedData = pagination
        ? data.slice((page - 1) * perPage, page * perPage)
        : data;

    return (
        <div className="border border-[#E4E7EC] overflow-hidden rounded-lg">
            <div className="max-h-[536px] overflow-y-auto">
                <table className={`${inter.className} rounded-lg w-full`}>
                    <thead>
                        <tr className='border border-[#E4E7EC] border-b border-b-[#98A2B3] text-[#667085] bg-[#E4E7EC]'>
                            {columns.map(c => (
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
                        {paginatedData.map(d => (
                            <tr
                                key={d.id}
                                onClick={() => onRowClick?.(d)}
                                className={cn("cursor-pointer border-b border-[#E4E7EC] hover:bg-[#F2F4F7]", d.id === selectedId && "bg-[#F2F4F7]")}>
                                {columns.map((c) => (
                                    <td className="text-[#1D2939]" key={String(c.key)}>
                                        {c.render ? (
                                            c.render(d)
                                        ) : (
                                            <div className={cn("p-[12px]", d.id === selectedId && "font-[600] pl-[16px]")}>
                                                {(d[c.key] as string)?.length === 0 ? "N/A" : (d[c.key] as ReactNode)}
                                            </div>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {pagination && (
                <Pagination
                    page={page}
                    pageCount={pageCount}
                    perPage={perPage}
                    onPageChange={(p) => setPage(p)}
                    onPerPageChange={(n) => {
                        setPerPage(n);
                        setPage(1);
                    }}
                />
            )}
        </div>
    )
}

export function createColumns<T extends object>() {
    return <U extends TableHeader<T>[]>(cols: U) => cols
}
