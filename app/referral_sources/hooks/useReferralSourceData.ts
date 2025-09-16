"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "@/constants/apiEndpoints";
import { RefSrc } from "@/constants/types"; 

export function useReferralSourceData() {
    const [sourcesBackUp, setSourcesBackUp] = useState<RefSrc[]>([]);
    const [sources, setSources] = useState<RefSrc[]>([]);

    const fetchSources = async () => {
        try {
            const res = await axios.get(API.REF.ROOT);
            if (res.data) {
                setSources(res.data);
                setSourcesBackUp(res.data);
            }
        } catch (error) {
            console.error("Failed to fetch sources:", error);
        }
    };

    useEffect(() => {
        fetchSources();
    }, []);

    return { sources, sourcesBackUp, setSources, fetchSources };
}