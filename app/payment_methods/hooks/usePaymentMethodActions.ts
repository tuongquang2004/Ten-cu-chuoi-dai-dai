"use client";

import axios from "axios";
import { API } from "@/constants/apiEndpoints";
import { VALIDATION_ERROR } from "@/constants/errorMessages";
import { PaymentMethod } from "@/constants/types";

const checkInput = (name: string, type: string) =>
  name.trim().length > 0 && type.trim().length > 0;

const makeMethodActive = async (id: string, isActive: boolean) => {
  try {
    const res = await axios.patch(API.PAYMENT_METHODS.BY_ID(id), { isActive });
    if (res.data) {
      return res.data;
    }
  } catch (err) {
    console.error(err);
  }
};

export function usePaymentMethodActions(
  name: string,
  type: string,
  code: string,
  isChecked: boolean,
  selected: PaymentMethod,
  setItems: React.Dispatch<React.SetStateAction<PaymentMethod[]>>,
  resetForm: () => void,
) {
  const trimmedName = name.trim();
  const trimmedType = type.trim();
  const trimmedCode = code.trim();
  const addMethod = async () => {
    if (!checkInput(trimmedName, trimmedType)) {
      alert(VALIDATION_ERROR.MISSING_REQUIRED_FIELDS);
      return;
    }

    try {
      const res = await axios.post(API.PAYMENT_METHODS.ROOT, {
        name: trimmedName,
        type: trimmedType,
        code: trimmedCode,
        isActive: false,
      });
      if (res.data) {
        let data = res.data;
        const confirm = window.confirm(
          `${trimmedName} added successfully. Do you want to make it active?`,
        );
        if (confirm) {
          data = await makeMethodActive(data.id, true);
        }
        setItems((prev) => [...prev, data]);
        resetForm();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const editMethod = async () => {
    if (!checkInput(trimmedName, trimmedType)) {
      alert(VALIDATION_ERROR.MISSING_REQUIRED_FIELDS);
      return;
    }

    try {
      const res = await axios.put(API.PAYMENT_METHODS.BY_ID(selected.id), {
        name: trimmedName,
        type: trimmedType,
        code: trimmedCode,
        isActive: isChecked ? !selected.isActive : selected.isActive,
      });
      if (res.data) {
        setItems((prev) =>
          prev.map((item) => (item.id === selected.id ? res.data : item)),
        );
        alert("Updated successfully");
        resetForm();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { addMethod, editMethod };
}
