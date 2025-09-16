"use client";

import { useState } from "react";
import { FormProps } from "@/constants/types";
import { defaultForm } from "@/constants/defaultValues";
import { inter } from "@/constants/fonts";
import axios from "axios";

type BaseEntity = {
    isActive: boolean;
};

type UseFormConfig<T extends BaseEntity, K extends keyof T> = {
    defaultEntity: T;
    apiById: (id: string) => string;
    labels: {
        add: { form: string; button: string };
        edit: { form: string; button: string };
    };
    nameKey: K;
};

export function useCommonForm<T extends BaseEntity, K extends keyof T & string>(
    config: UseFormConfig<T, K>
) {
    const { defaultEntity, apiById, labels, nameKey } = config;

    const [name, setName] = useState<string>("");
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [isShow, setIsShow] = useState<boolean>(false);
    const [selected, setSelected] = useState<T>(defaultEntity);
    const [form, setForm] = useState<FormProps>(defaultForm);

    const getById = async (id: string): Promise<T | null> => {
        try {
            const res = await axios.get(apiById(id));
            if (res.data) {
                setSelected(res.data as T);
                return res.data as T;
            }
        } catch (error) {
            console.error("Failed to fetch entity by id:", error);
        }
        return null;
    };

    const showAddForm = () => {
        setIsShow(true);
        setForm({
            label: labels.add.form,
            buttonLabel: labels.add.button,
            action: "add",
        });
        setName("");
        setIsChecked(false);
    };

    const showEditForm = async (id: string) => {
        const res = await getById(id);
        if (res) {
            setIsShow(true);
            setForm({
                label: labels.edit.form,
                buttonLabel: labels.edit.button,
                statusCheckbox: {
                    className: `${inter.className} font-[700] text-[14px]`,
                    current: res.isActive,
                    onChange: setIsChecked,
                },
                action: "edit",
            });
            setName(String(res[nameKey]));
            setIsChecked(false);
        }
    };

    const resetForm = () => {
        setName("");
        setIsChecked(false);
        setIsShow(false);
        setSelected(defaultEntity);
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
        resetForm
    };
}
