'use client'

import { LeftArrow2, RightArrow2 } from '@/public/assets/icons'
import { useEffect } from 'react';

type PaginationProps = {
    page: number;
    pageCount: number;
    perPage: number;
    perPageOptions?: number[];
    onPageChange: (p: number) => void;
    onPerPageChange: (n: number) => void;
    className?: string;
}

export default function Pagination({
    page,
    pageCount,
    perPage,
    perPageOptions = [10, 25, 50],
    onPageChange,
    onPerPageChange,
    className = '',
}: Readonly<PaginationProps>) {
    const prevDisabled = page <= 1
    const nextDisabled = page >= pageCount

    useEffect(() => {
        if (page > pageCount && pageCount > 0) {
            onPageChange(pageCount);
        }
    }, [page, pageCount, onPageChange]);

    const pages = Array.from({ length: pageCount }, (_, i) => i + 1)

    return (
        <div className={`flex items-center px-2 py-3 border-t border-[#E4E7EC] bg-white rounded-b-lg ${className}`}>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => !prevDisabled && onPageChange(page - 1)}
                    className="flex items-center gap-1 rounded px-3 py-1 text-sm text-[#344054]
                     border border-transparent hover:bg-slate-50 cursor-pointer"
                >
                    <LeftArrow2 /> Previous
                </button>

                <div className="flex items-center gap-1">
                    {pages.map((n) => (
                        <button
                            key={n}
                            onClick={() => onPageChange(n)}
                            className={
                                n === page
                                    ? "h-8 w-8 rounded-md border text-sm bg-[#2F3680] text-white border-[#E87200]"
                                    : "mx-3 text-sm text-[#344054] hover:text-[#2F3680] cursor-pointer"
                            }
                            aria-current={n === page ? "page" : undefined}
                        >
                            {n}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => !nextDisabled && onPageChange(page + 1)}
                    className="flex items-center gap-1 rounded px-3 py-1 text-sm text-[#344054]
                     border border-transparent hover:bg-slate-50 cursor-pointer"
                >
                    Next <RightArrow2 />
                </button>
            </div>

            <div className="flex items-center gap-2 border-l border-[#E4E7EC] pl-3">
                <div className="relative">
                    <select
                        value={perPage}
                        onChange={(e) => onPerPageChange(Number(e.target.value))}
                        className="appearance-none rounded border border-slate-300 bg-[#E4E7EC] px-3 py-1.5 pr-7 text-sm text-[#344054]
                       hover:bg-slate-50"
                    >
                        {perPageOptions.map((n) => (
                            <option key={n} value={n}>
                                {n} Per Pages
                            </option>
                        ))}
                    </select>
                    <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#344054]">▾</span>
                </div>
            </div>
        </div>
    )
}