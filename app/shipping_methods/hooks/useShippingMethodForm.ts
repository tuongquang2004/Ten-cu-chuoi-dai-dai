"use client";

import { useState } from "react";
import { FormProps, ShippingMethod } from "@/constants/types";
import { defaultForm, defaultValueSimple } from "@/constants/defaultValues";
import { inter } from "@/constants/fonts";
import axios from "axios";
import { API } from "@/constants/apiEndpoints";

export function useShippingMethodForm() {
    const [name, setName] = useState<string>("");
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [isShow, setIsShow] = useState<boolean>(false);
    const [selected, setSelected] = useState<ShippingMethod>(defaultValueSimple);
    const [form, setForm] = useState<FormProps>(defaultForm);

    const getShippingMethodById = async (id: string) => {
        try {
            const res = await axios.get(API.SHIPPING_METHODS.BY_ID(id));
            if (res.data) {
                setSelected(res.data);
                return res.data;
            }
        } catch (error) {
            console.error("Failed to fetch shipping method by id:", error);
            return null;
        }
    };

    const showAddForm = () => {
        setIsShow(true);
        setForm({
            label: "Add Shipping Method",
            buttonLabel: "Add Shipping Method",
            action: "add",
        });
        setName("");
        setIsChecked(false);
    };

    const showEditForm = async (id: string) => {
        const res = await getShippingMethodById(id);
        if (res) {
            setIsShow(true);
            setForm({
                label: "Edit Shipping Method",
                buttonLabel: "Save Changes",
                statusCheckbox: {
                    className: `${inter.className} font-[700] text-[14px]`,
                    current: res.isActive,
                    onChange: setIsChecked,
                },
                action: "edit",
            });
            setName(res.name);
            setIsChecked(false);
        }
    };

    const resetForm = () => {
        setName("");
        setIsChecked(false);
        setIsShow(false);
        setSelected(defaultValueSimple);
        setForm(defaultForm);
    };

    return {
        name,
        setName,
        isChecked,
        setIsChecked,
        isShow,
        setIsShow,
        selected,
        form,
        showAddForm,
        showEditForm,
        resetForm,
    };
}