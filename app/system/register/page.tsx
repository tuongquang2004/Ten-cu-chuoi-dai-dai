"use client"

import AuthLayout from "@/components/AuthLayout";
import CommonButton from "@/components/CommonButton";
import CommonInput from "@/components/CommonInput";
import { Icon } from "@/components/Icon";
import PageHeader from "@/components/PageHeader";
import { useEffect, useState } from "react";

export default function Register() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%]/;

    type input = {
        value: string,
        error: string
    }

    type checks = {
        length: boolean,
        upper: boolean,
        digit: boolean,
        special: boolean
    }

    const [email, setEmail] = useState<input>({ value: '', error: '' });
    const [password, setPassword] = useState<input>({ value: '', error: '' });
    const [confirmPassword, setConfirmPassword] = useState<input>({ value: '', error: '' });
    const [passwordChecks, setPasswordChecks] = useState<checks>({ length: false, upper: false, digit: false, special: false });

    const handleSubmit = () => {
        let submit = true;
        if (!emailRegex.test(email.value)) {
            setEmail({ ...email, error: 'The email is not valid' })
            submit = false;
        }
        if (password.value.length < 8) {
            setPasswordChecks({ ...passwordChecks, length: false });
            setConfirmPassword({ ...password, error: ' Please meet all password requirements ' })
            submit = false;
        }
        if (uppercaseRegex.test(password.value)) {
            setPasswordChecks({ ...passwordChecks, upper: false });
            setConfirmPassword({ ...password, error: ' Please meet all password requirements ' })
            submit = false;
        }
        if (numberRegex.test(password.value)) {
            setPasswordChecks({ ...passwordChecks, digit: false });
            setConfirmPassword({ ...password, error: ' Please meet all password requirements ' })
            submit = false;
        }
        if (specialCharRegex.test(password.value)) {
            setPasswordChecks({ ...passwordChecks, special: false });
            setConfirmPassword({ ...password, error: ' Please meet all password requirements ' })
            submit = false;
        }
        if (submit) {
            if (password !== confirmPassword) {
                setConfirmPassword({ ...confirmPassword, error: 'This password does not match the one you entered above' })
                submit = false
            }
            if (submit) {
                handleRegister();
            }
        }
    }

    const handleRegister = () => {

    }

    useEffect(() => {

        setPassword(prev => {
            const trimmedValue = prev.value.replace(/\s/g, "");
            return trimmedValue !== prev.value ? { ...prev, value: trimmedValue } : prev;
        });

        setConfirmPassword(prev => {
            const trimmedValue = prev.value.replace(/\s/g, "");
            return trimmedValue !== prev.value ? { ...prev, value: trimmedValue } : prev;
        });
    }, [email.value, password.value, confirmPassword.value]);

    return (
        <div>
            <AuthLayout>
                <div className="flex flex-col justify-center gap-8 w-full">
                    <div className="flex justify-start">
                        <Icon.Logo />
                    </div>
                    <PageHeader title="Register" subtitle="Register a new account with your email address and password" titleColor="#252C88" subtitleColor="#475467" size="xl" />
                    <div className="flex flex-col gap-4 w-full">
                        <CommonInput label="Email Address" placeholder="Enter your email address" value={email.value} error={email.error} type="email" onChange={(val) => setEmail({ ...email, value: val })} />
                        <CommonInput label="Password" placeholder="Enter your Password" value={password.value} error={password.error} type="password" onChange={(val) => setPassword({ ...password, value: val })} />
                        <CommonInput label="Confirm Password" placeholder="Enter your Password Again" value={confirmPassword.value} error={confirmPassword.error} type="password" onChange={(val) => setConfirmPassword({ ...confirmPassword, value: val })} />
                    </div>
                    <CommonButton variant="primary" className="rounded-full text-[12px] h-[40px]">Register</CommonButton>
                </div>
            </AuthLayout>
        </div>
    )
}