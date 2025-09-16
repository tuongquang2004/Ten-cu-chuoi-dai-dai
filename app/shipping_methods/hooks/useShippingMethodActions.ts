"use client";

import axios from "axios";
import { API } from "@/constants/apiEndpoints";
import { VALIDATION_ERROR } from "@/constants/errorMessages";
import { ShippingMethod } from "@/constants/types";

const checkName = (name: string) => name.trim().length > 0;

const makeMethodActive = async (id: string, isActive: boolean, setItems: React.Dispatch<React.SetStateAction<ShippingMethod[]>>) => {
    try {
        const res = await axios.patch(API.SHIPPING_METHODS.BY_ID(id), { isActive });
        if (res.data) {
            setItems((prev) =>
                prev.map((item) => (item.id === id ? res.data : item))
            );
            return res.data;
        }
    } catch (err) {
        console.error(err);
    }
};

export function useShippingMethodActions(
    name: string,
    isChecked: boolean,
    selected: ShippingMethod,
    setItems: React.Dispatch<React.SetStateAction<ShippingMethod[]>>,
    resetForm: () => void
) {
    const addItem = async () => {
        const trimmedName = name.trim();
        if (!checkName(trimmedName)) {
            alert(VALIDATION_ERROR.MISSING_SHIP_NAME);
            return;
        }

        try {
            const res = await axios.post(API.SHIPPING_METHODS.ROOT, {
                name: trimmedName,
                isActive: false,
            });
            if (res.data) {
                let data = res.data;
                const confirm = window.confirm(
                    `${trimmedName} added successfully. Do you want to make it active?`
                );
                if (confirm) {
                    data = await makeMethodActive(data.id, true, setItems);
                }
                setItems((prev) => [...prev, data]);
                resetForm();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const editItem = async () => {
        if (!checkName(name)) {
            alert(VALIDATION_ERROR.MISSING_SHIP_NAME);
            return;
        }

        try {
            const res = await axios.put(API.SHIPPING_METHODS.BY_ID(selected.id), {
                name: name.trim(),
                isActive: isChecked ? !selected.isActive : selected.isActive,
            });
            if (res.data) {
                setItems((prev) =>
                    prev.map((item) => (item.id === selected.id ? res.data : item))
                );
                alert("Updated successfully");
                resetForm();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return { addItem, editItem };
}