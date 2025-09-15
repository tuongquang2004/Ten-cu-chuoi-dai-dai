"use client";

import { useState, useEffect } from "react";
import { RefSrc } from "@/constants/types"; 

export function useReferralSourceSearchAndFilter(
    sourcesBackUp: RefSrc[],
    setSources: React.Dispatch<React.SetStateAction<RefSrc[]>>
) {
    const [pendingSearch, setPendingSearch] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [filter, setFilter] = useState<string[]>([]);

    const handleSearch = () => {
        setSearch(pendingSearch);
    };

    useEffect(() => {
        let data = [...sourcesBackUp];
        if (search.length !== 0) {
            data = data.filter((d) =>
                d.source.toLowerCase().trim().includes(search.toLowerCase().trim())
            );
        }

        if (filter.length === 1) {
            data = data.filter((d) => d.isActive === (filter[0] === "true"));
        }

        setSources(data);
    }, [search, filter, sourcesBackUp, setSources]);

    return { pendingSearch, setPendingSearch, filter, setFilter, handleSearch };
}