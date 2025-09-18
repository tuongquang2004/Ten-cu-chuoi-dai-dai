import { ReactNode, useEffect, useMemo, useState } from "react";
import { Inter } from "@/constants/fonts";
import Pagination from "./Pagination";
import { cn } from "@/app/cn";
import { SortIcon } from "@/public/assets/icons";

type TableHeader<T> = {
  label: string;
  key: keyof T;
  headerClassName?: string;
  sort?: boolean;
  render?: (row: T) => ReactNode;
};

type TableProps<T> = {
  columns: TableHeader<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  onContextMenu?: (row: T, e: React.MouseEvent) => void;
  pagination?: boolean;
  selectedId?: string;
};

const baseColumnHeader = "text-start p-[12px]";

export default function CommonTable<T extends { id: string }>({
  columns,
  data,
  onRowClick,
  onContextMenu,
  pagination = false,
  selectedId,
}: Readonly<TableProps<T>>) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const pageCount = Math.ceil(data.length / perPage);

  const paginatedData = pagination
    ? sortedData.slice((page - 1) * perPage, page * perPage)
    : sortedData;

  const handleSort = (key: keyof T) => {
    setSortConfig((prev) => {
      if (key === prev.key) {
        return {
          key: prev.direction === "desc" ? null : key,
          direction: prev.direction === "desc" ? "asc" : "desc",
        };
      }
      return { key: key, direction: "asc" };
    });
  };

  return (
    <div className="border border-[#E4E7EC] overflow-hidden rounded-lg">
      <div className="max-h-[581px] overflow-y-auto">
        <table className={`${Inter.className} rounded-lg w-full`}>
          <thead>
            <tr className="border border-[#E4E7EC] border-b border-b-[#98A2B3] text-[#667085] bg-[#E4E7EC]">
              {columns.map((c) => (
                <th className={cn(baseColumnHeader)} key={String(c.key)}>
                  <div
                    className={cn(
                      "flex justify-between items-center",
                      c.headerClassName
                    )}
                  >
                    {c.label}
                    {c.sort && (
                      <button
                        onClick={() => handleSort(c.key)}
                        className="cursor-pointer"
                      >
                        <SortIcon />
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((d) => (
              <tr
                key={d.id}
                onClick={() => onRowClick?.(d)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  onContextMenu?.(d, e);
                }}
                className={cn(
                  "cursor-pointer border-b border-[#E4E7EC] hover:bg-[#F2F4F7]",
                  d.id === selectedId && "bg-[#F2F4F7]"
                )}
              >
                {columns.map((c) => (
                  <td className="text-[#1D2939]" key={String(c.key)}>
                    <div
                      className={cn(
                        "p-[12px]",
                        d.id === selectedId && "font-[600] pl-[16px]"
                      )}
                    >
                      {c.render ? (
                        c.render(d)
                      ) : (
                        <div>
                          {(d[c.key] as string)?.length === 0
                            ? "N/A"
                            : (d[c.key] as ReactNode)}
                        </div>
                      )}
                    </div>
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
  );
}

export function createColumns<T extends object>() {
  return <U extends TableHeader<T>[]>(cols: U) => cols;
}
