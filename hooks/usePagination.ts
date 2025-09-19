"use client";
import { useMemo, useState } from "react";

export function usePagination<T>(data: T[], initialPerPage = 25) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(initialPerPage);

  const pageCount = Math.max(1, Math.ceil(data.length / perPage));
  const start = (page - 1) * perPage;

  const pageRows = useMemo(
    () => data.slice(start, start + perPage),
    [data, start, perPage]
  );

  const onPerPageChange = (n: number) => {
    setPerPage(n);
    setPage(1);
  };

  return { page, setPage, perPage, onPerPageChange, pageCount, pageRows };
}
