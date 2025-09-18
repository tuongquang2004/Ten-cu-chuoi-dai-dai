"use client";

import { useState } from "react";
import { FormProps, PaymentMethod } from "@/constants/types";
import { defaultForm, defaultPaymentMethod } from "@/constants/defaultValues";
import axios from "axios";
import { API } from "@/constants/apiEndpoints";

export function usePaymentMethodForm() {
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [selected, setSelected] = useState<PaymentMethod>(defaultPaymentMethod);
  const [form, setForm] = useState<FormProps>(defaultForm);

  const getMethodById = async (id: string) => {
    try {
      const res = await axios.get(API.PAYMENT_METHODS.BY_ID(id));
      if (res.data) {
        setSelected(res.data);
        return res.data;
      }
    } catch (error) {
      console.error("Failed to fetch payment method by id:", error);
      return null;
    }
  };

  const showAddForm = () => {
    setIsShow(true);
    setForm({
      label: "Add New Payment Method",
      buttonLabel: "Add Payment Method",
      action: "add",
    });
    setName("");
    setType("");
    setCode("");
    setIsChecked(false);
  };

  const showEditForm = async (id: string) => {
    const res = await getMethodById(id);
    if (res) {
      setIsShow(true);
      setForm({
        label: "Edit Payment Method",
        buttonLabel: "Save Changes",
        statusCheckbox: {
          className: "font-[700] text-[14px]",
          current: res.isActive,
          onChange: setIsChecked,
        },
        action: "edit",
      });
      setName(res.name);
      setType(res.type);
      setCode(res.code);
      setIsChecked(false);
    }
  };

  const resetForm = () => {
    setName("");
    setType("");
    setCode("");
    setIsChecked(false);
    setIsShow(false);
    setSelected(defaultPaymentMethod);
    setForm(defaultForm);
  };

  return {
    name,
    setName,
    type,
    setType,
    code,
    setCode,
    isChecked,
    setIsChecked,
    isShow,
    setIsShow,
    selected,
    setSelected,
    form,
    showAddForm,
    showEditForm,
    resetForm,
  };
}
