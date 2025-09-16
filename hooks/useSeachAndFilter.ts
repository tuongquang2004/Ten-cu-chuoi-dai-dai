"use client";

import { useState, useEffect } from "react";

type SearchableFilterable = {
    name: string;
    isActive: boolean;
};

export function useSearchAndFilter<T extends SearchableFilterable>(
    backup: T[],
    setSources: React.Dispatch<React.SetStateAction<T[]>>
) {
    const [pendingSearch, setPendingSearch] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [filter, setFilter] = useState<string[]>([]);

    const handleSearch = () => {
        setSearch(pendingSearch);
    };

    useEffect(() => {
        let data = [...backup];

        if (search.length !== 0) {
            data = data.filter((d) =>
                d.name.toLowerCase().trim().includes(search.toLowerCase().trim())
            );
        }

        if (filter.length === 1) {
            data = data.filter((d) => d.isActive === (filter[0] === "true"));
        }

        setSources(data);
    }, [search, filter, backup, setSources]);

    return { pendingSearch, setPendingSearch, filter, setFilter, handleSearch };
}
