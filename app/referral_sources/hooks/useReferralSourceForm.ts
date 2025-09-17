"use client";

import { useState } from "react";
import { FormProps, RefSrc } from "@/constants/types";
import { defaultForm, defaultRefSrc } from "@/constants/defaultValues";
import { inter } from "@/constants/fonts";
import axios from "axios";
import { API } from "@/constants/apiEndpoints";

export function useReferralSourceForm() {
  const [name, setName] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [selected, setSelected] = useState<RefSrc>(defaultRefSrc);
  const [form, setForm] = useState<FormProps>(defaultForm);

  const getRefSrcById = async (id: string) => {
    try {
      const res = await axios.get(API.REF.BY_ID(id));
      if (res.data) {
        setSelected(res.data);
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
    setName("");
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
      setName(res.name);
      setIsChecked(false);
    }
  };

  const resetForm = () => {
    setName("");
    setIsChecked(false);
    setIsShow(false);
    setSelected(defaultRefSrc);
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
