"use client";
import { useMemo, useState } from "react";

export function useColumnsFilter<
  K extends string,
  T extends { key: K; label: string },
>(allColumns: readonly T[], lockedKey: K) {
  const filterItems = useMemo(
    () =>
      allColumns
        .filter((c) => c.key !== lockedKey)
        .map((c) => ({ key: c.key, label: c.label, value: c.key })),
    [allColumns, lockedKey],
  );

  const [selectedKeys, setSelectedKeys] = useState<K[]>([]);

  const handleFilterChange = (vals: string[]) => {
    setSelectedKeys(vals as K[]);
  };

  const colMap = useMemo(
    () => new Map<K, T>(allColumns.map((c) => [c.key, c] as [K, T])),
    [allColumns],
  );

  const lockedCol = useMemo(
    () => allColumns.find((c) => c.key === lockedKey)!,
    [allColumns, lockedKey],
  );

  const visibleColumns = useMemo(
    () => [
      lockedCol,
      ...selectedKeys.map((k) => colMap.get(k)!).filter(Boolean),
    ],
    [lockedCol, selectedKeys, colMap],
  );

  return { filterItems, selectedKeys, handleFilterChange, visibleColumns };
}
