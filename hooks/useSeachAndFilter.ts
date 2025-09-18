import { useEffect, useState } from "react";

export function useSearchAndFilter<T extends { isActive: boolean }>(
  backup: T[],
  setSources: React.Dispatch<React.SetStateAction<T[]>>,
  searchKey: keyof T
) {
  const [pendingSearch, setPendingSearch] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string[]>([]);

  const handleSearch = () => {
    setSearch(pendingSearch);
  };

  useEffect(() => {
    let data = [...backup];

    if (search.length !== 0) {
      data = data.filter((d) =>
        String(d[searchKey])
          .toLowerCase()
          .trim()
          .includes(search.toLowerCase().trim())
      );
    }

    if (filter.length === 1) {
      data = data.filter((d) => d.isActive === (filter[0] === "true"));
    }

    setSources(data);
  }, [search, filter, backup, setSources, searchKey]);

  return {
    pendingSearch,
    setPendingSearch,
    filter,
    setFilter,
    handleSearch,
  };
}
