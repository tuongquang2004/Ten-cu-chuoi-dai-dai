"use client";

import { REGEX } from "@/constants/regex";
import { useState } from "react";
import { useLogin } from "./useLogin";
import { VALIDATION_ERROR } from "@/constants/errorMessages";

export function useLoginForm() {
  const emailRegex = REGEX.EMAIL;
  const { handleLogin } = useLogin();
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleSubmit = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    let submit = true;

    if (trimmedEmail.length === 0) {
      setEmailError(VALIDATION_ERROR.MISSING_EMAIL);
      submit = false;
    } else if (!emailRegex.test(trimmedEmail)) {
      setEmailError(VALIDATION_ERROR.INVALID_EMAIL);
      submit = false;
    }

    if (trimmedPassword.length === 0) {
      setPasswordError(VALIDATION_ERROR.MISSING_PASSWORD);
      submit = false;
    } else {
      setPasswordError("");
    }

    if (submit) {
      setEmail(trimmedEmail);
      setPassword(trimmedPassword);
      setEmailError("");
      handleLogin(trimmedEmail, trimmedPassword);
    }
  };

  return {
    email,
    password,
    emailError,
    passwordError,
    setEmail,
    setPassword,
    setEmailError,
    setPasswordError,
    handleSubmit,
  };
}
