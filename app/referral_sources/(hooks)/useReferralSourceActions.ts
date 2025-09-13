"use client";

import axios from "axios";
import { API } from "@/constants/apiEndpoints";
import { VALIDATION_ERROR } from "@/constants/errorMessages";
import { RefSrc } from "@/lib/data";

const checkName = (name: string) => name.trim().length > 0;

const editSource2 = async (id: string, source: string, isActive: boolean, setSources: React.Dispatch<React.SetStateAction<RefSrc[]>>) => {
    try {
        const res = await axios.put(API.REF.BY_ID(id), { source, isActive });
        if (res.data) {
            setSources((prev) =>
                prev.map((src) => (src.id === id ? res.data : src))
            );
            return res.data;
        }
    } catch (err) {
        console.error(err);
    }
};

export function useReferralSourceActions(
    refName: string,
    isChecked: boolean,
    selectedSource: RefSrc,
    setSources: React.Dispatch<React.SetStateAction<RefSrc[]>>,
    resetForm: () => void
) {
    const addSource = async () => {
        const trimmedName = refName.trim();
        if (!checkName(trimmedName)) {
            alert(VALIDATION_ERROR.MISSING_REFERRAL_NAME);
            return;
        }

        try {
            const res = await axios.post(API.REF.ROOT, {
                source: trimmedName,
                isActive: false,
            });
            if (res.data) {
                let data = res.data;
                const confirm = window.confirm(
                    `${trimmedName} added successfully. Do you want to make it active?`
                );
                if (confirm) {
                    data = await editSource2(data.id, data.source, true, setSources);
                }
                setSources((prev) => [...prev, data]);
                resetForm();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const editSource = async () => {
        if (!checkName(refName)) {
            alert(VALIDATION_ERROR.MISSING_REFERRAL_NAME);
            return;
        }

        try {
            const res = await axios.put(API.REF.BY_ID(selectedSource.id), {
                source: refName.trim(),
                isActive: isChecked ? !selectedSource.isActive : selectedSource.isActive,
            });
            if (res.data) {
                setSources((prev) =>
                    prev.map((src) => (src.id === selectedSource.id ? res.data : src))
                );
                alert("Updated successfully");
                resetForm();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return { addSource, editSource };
}