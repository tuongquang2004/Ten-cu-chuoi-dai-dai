"use client";

import { cn } from "@/app/cn";
import { createColumns } from "@/components/CommonTable";
import { API } from "@/constants/apiEndpoints";
import { VALIDATION_ERROR } from "@/constants/errorMessages";
import { defaultForm, defaultRefSrc, FormProps, inter, RefSrc } from "@/lib/data";
import axios from "axios";
import { useEffect, useState } from "react";

export function useReferralSources() {
    const [sourcesBackUp, setSourcesBackUp] = useState<RefSrc[]>([]);
    const [sources, setSources] = useState<RefSrc[]>([]);
    const [refName, setRefName] = useState<string>("");
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [isShow, setIsShow] = useState<boolean>(false);
    const [selectedSource, setSelectedSource] = useState<RefSrc>(defaultRefSrc);
    const [form, setForm] = useState<FormProps>(defaultForm);

    const fetchSources = async () => {
        const res = await axios.get(API.REF.ROOT);
        if (res.data) {
            setSources(res.data);
            setSourcesBackUp(res.data);
        };
    };

    useEffect(() => {
        fetchSources();
    }, []);

    const header = createColumns<RefSrc>()([
        {
            key: "source",
            label: "Source",
        },
        {
            key: "isActive",
            label: "Status",
            headerClassName: "text-center",
            render: (row) => {
                const isActive = row.isActive;
                const bgColor = isActive ? "bg-[#D2FFD7]" : "bg-[#FFDFDD]";
                const textColor = isActive ? "text-[#00770C]" : "text-[#E42C1B]";
                const text = isActive ? "Active" : "Inactive";

                return (
                    <div className={cn('flex justify-center items-center w-full h-full')}>
                        <div
                            className={cn(`shadow-[2px_3px_8px_rgba(0,0,0,0.15)] text-center font-medium rounded-full w-fit py-[3px] min-w-[77px] text-[15px] ${bgColor} ${textColor}`)}
                        >
                            {text}
                        </div>
                    </div>
                );
            },
        },
    ]);

    const checkName = (name: string) => name.trim().length > 0;

    const getRefSrcById = async (id: string) => {
        const res = await axios.get(API.REF.BY_ID(id));
        if (res.data) {
            setSelectedSource(res.data);
            return res.data;
        }
        return null;
    };

    const showAddForm = () => {
        setIsShow(true);
        setForm({
            label: "Add Referral Source",
            buttonLabel: "Add Referral Source",
            action: 'add'
        });
        setRefName("");
        setIsChecked(false);
    };

    const showEditForm = async (id: string) => {
        const res = await getRefSrcById(id);
        if (res) {
            setIsShow(true);
            setForm({
                label: "Edit Referral Source",
                buttonLabel: "Save Changes",
                statusCheckbox: {
                    className: `${inter.className} font-[700] text-[14px]`,
                    current: res.isActive,
                    onChange: setIsChecked,
                },
                action: 'edit'

            });
            setRefName(res.source);
            setIsChecked(false);
        }
    };

    const addSource = async () => {
        console.log('add');

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
                    data = await editSource2(data.id, data.source, true);
                }
                setSources((prev) => [...prev, data]);
                setRefName("");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const editSource = async (id: string) => {
        if (!checkName(refName)) {
            alert(VALIDATION_ERROR.MISSING_REFERRAL_NAME);
            return;
        }

        try {
            const res = await axios.put(API.REF.BY_ID(id), {
                source: refName,
                isActive: isChecked && !selectedSource.isActive,
            });
            if (res.data) {
                setSources((prev) =>
                    prev.map((src) => (src.id === id ? res.data : src))
                );
                alert("Updated successfully");
                setIsShow(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const editSource2 = async (id: string, source: string, isActive: boolean) => {
        const res = await axios.put(API.REF.BY_ID(id), { source, isActive });
        if (res.data) {
            setSources((prev) =>
                prev.map((src) => (src.id === id ? res.data : src))
            );
            return res.data;
        }
    };

    return { sources, sourcesBackUp, header, form, refName, isChecked, isShow, selectedSource, setSources, setRefName, setIsChecked, setIsShow, showAddForm, showEditForm, addSource, editSource };
}
