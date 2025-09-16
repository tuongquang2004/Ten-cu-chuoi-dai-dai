"use client";

import { useState } from "react";
import { FormProps, RefSrc } from "@/constants/types";
import { defaultForm, defaultRefSrc } from "@/constants/defaultValues";
import { inter } from "@/constants/fonts";
import axios from "axios";
import { API } from "@/constants/apiEndpoints";

export function useReferralSourceForm() {
    const [refName, setRefName] = useState<string>("");
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [isShow, setIsShow] = useState<boolean>(false);
    const [selectedSource, setSelectedSource] = useState<RefSrc>(defaultRefSrc);
    const [form, setForm] = useState<FormProps>(defaultForm);

    const getRefSrcById = async (id: string) => {
        try {
            const res = await axios.get(API.REF.BY_ID(id));
            if (res.data) {
                setSelectedSource(res.data);
                return res.data;
            }
        } catch (error) {
            console.error("Failed to fetch referral source by id:", error);
            return null;
        }
    };

    const showAddForm = () => {
        setIsShow(true);
        setForm({
            label: "Add Referral Source",
            buttonLabel: "Add Referral Source",
            action: "add",
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
                action: "edit",
            });
            setRefName(res.source);
            setIsChecked(false);
        }
    };

    const resetForm = () => {
        setRefName("");
        setIsChecked(false);
        setIsShow(false);
        setSelectedSource(defaultRefSrc);
        setForm(defaultForm);
    };

    return {
        refName,
        setRefName,
        isChecked,
        setIsChecked,
        isShow,
        setIsShow,
        selectedSource,
        form,
        showAddForm,
        showEditForm,
        resetForm,
    };
}