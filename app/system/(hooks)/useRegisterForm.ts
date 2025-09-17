"use client";

import { useState } from "react";
import { REGEX } from "@/constants/regex";
import { useRegister } from "./useRegister";
import { useChecks } from "./useChecks";
import { VALIDATION_ERROR } from "@/constants/errorMessages";

export function useRegisterForm() {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  const { passwordChecks, checkPassword } = useChecks();
  const { handleRegister } = useRegister();

  const handleSubmit = () => {
    let submit = true;
    const trimmedEmail = email.trim();
    const trimmedName = name.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    if (trimmedEmail.length === 0) {
      setEmailError(VALIDATION_ERROR.MISSING_EMAIL);
    } else if (!REGEX.EMAIL.test(trimmedEmail)) {
      setEmailError(VALIDATION_ERROR.INVALID_EMAIL);
      submit = false;
    } else {
      setEmailError("");
    }

    if (trimmedName.length === 0) {
      setNameError(VALIDATION_ERROR.MISSING_NAME);
    } else {
      setNameError("");
    }

    if (trimmedPassword.length === 0) {
      setPasswordError(VALIDATION_ERROR.MISSING_PASSWORD);
    } else {
      setPasswordError("");
    }

    submit = checkPassword(trimmedPassword);

    if (submit) {
      if (trimmedPassword !== trimmedConfirmPassword) {
        setConfirmPasswordError(VALIDATION_ERROR.MISMATCH_PASSWORDS);
        submit = false;
      }
      if (submit) {
        setConfirmPasswordError("");
        handleRegister(trimmedEmail, trimmedName, trimmedPassword);
      }
    }
  };

  return {
    email,
    name,
    password,
    confirmPassword,
    emailError,
    nameError,
    passwordError,
    confirmPasswordError,
    passwordChecks,
    setEmail,
    setName,
    setPassword,
    setConfirmPassword,
    setEmailError,
    setPasswordError,
    setNameError,
    setConfirmPasswordError,
    handleSubmit,
  };
}
