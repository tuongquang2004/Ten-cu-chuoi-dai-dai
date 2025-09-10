"use client"

import { regex } from "@/constants/regex";
import { input } from "@/lib/data";
import { useState } from "react";
import { useLogin } from "./useLogin";

export function useLoginForm() {
    const emailRegex = regex.emailRegex;
    const { handleLogin } = useLogin();
    const [email, setEmail] = useState<input>({ value: '', error: '' });
    const [password, setPassword] = useState<input>({ value: '', error: '' });

    const handleSubmit = () => {
        const trimmedEmail = email.value.trim();
        const trimmedPassword = password.value.trim();
        let submit = true;

        if (trimmedEmail.length === 0) {
            setEmail({ value: trimmedEmail, error: 'Please enter your email' });
            submit = false;
        } else if (!emailRegex.test(trimmedEmail)) {
            setEmail({ value: trimmedEmail, error: 'Please enter a valid email' });
            submit = false;
        }

        if (trimmedPassword.length === 0) {
            setPassword({ value: trimmedPassword, error: 'Please enter your password' });
            submit = false;
        }

        if (submit) {
            setEmail({ value: trimmedEmail, error: '' });
            setPassword({ value: trimmedPassword, error: '' });
            handleLogin(trimmedEmail, trimmedPassword);
        }
    };

    return { email, password, setEmail, setPassword, handleSubmit }
}