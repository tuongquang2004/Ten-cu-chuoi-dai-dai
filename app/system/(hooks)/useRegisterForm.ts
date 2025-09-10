"use client";

import { input } from "@/lib/data";
import { useState } from "react";
import { regex } from "@/constants/regex";
import { useRegister } from "./useRegister";
import { useChecks } from "./useChecks";

export function useRegisterForm() {
    const [email, setEmail] = useState<input>({ value: "", error: "" });
    const [name, setName] = useState<input>({ value: "", error: "" });
    const [password, setPassword] = useState<input>({ value: "", error: "" });
    const [confirmPassword, setConfirmPassword] = useState<input>({
        value: "",
        error: "",
    });

    const { passwordChecks, checkPassword } = useChecks();
    const { handleRegister } = useRegister();

    const handleSubmit = () => {
        let submit = true;
        const trimmedEmail = email.value.trim();
        const trimmedName = name.value.trim();
        const trimmedPassword = password.value.trim();
        const trimmedConfirmPassword = confirmPassword.value.trim();

        if (trimmedEmail.length === 0) {
            setEmail({ value: trimmedEmail, error: "Please enter your email" });
        } else if (!regex.emailRegex.test(trimmedEmail)) {
            setEmail({ value: trimmedEmail, error: "The email is not valid" });
            submit = false;
        } else {
            setEmail({ value: trimmedEmail, error: "" });
        }

        if (trimmedName.length === 0) {
            setName({ value: trimmedName, error: "Please enter your name" });
        } else {
            setName({ value: trimmedName, error: "" });
        }

        if (trimmedPassword.length === 0) {
            setPassword({ value: trimmedPassword, error: "Please enter a password" });
        } else {
            setPassword({ value: trimmedPassword, error: "" });
        }

        submit = checkPassword(trimmedPassword);

        if (submit) {
            if (password.value !== confirmPassword.value) {
                setConfirmPassword({
                    value: trimmedConfirmPassword,
                    error: "This password does not match the one you entered above",
                });
                submit = false;
            }
            if (submit) {
                setConfirmPassword({ value: trimmedConfirmPassword, error: "" });
                handleRegister(trimmedEmail, trimmedName, trimmedPassword);
            }
        }
    };

    return {
        email,
        name,
        password,
        confirmPassword,
        passwordChecks,
        setEmail,
        setName,
        setPassword,
        setConfirmPassword,
        handleSubmit,
    };
}
