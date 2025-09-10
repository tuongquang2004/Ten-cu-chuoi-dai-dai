"use client"

import AuthLayout from "@/components/AuthLayout";
import CommonButton from "@/components/CommonButton";
import CommonInput from "@/components/CommonInput";
import { Icon } from "@/components/Icon";
import PageHeader from "@/components/PageHeader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRegisterForm } from "../(hooks)/useRegisterForm";
import PasswordChecks from "@/components/PasswordChecks";

export default function Register() {
    const router = useRouter();
    const { email, name, password, confirmPassword, passwordChecks, setEmail, setName, setPassword, setConfirmPassword, handleSubmit } = useRegisterForm();

    useEffect(() => {
        setPassword(prev => {
            const trimmedValue = prev.value.replace(/\s/g, "");
            return trimmedValue !== prev.value ? { ...prev, value: trimmedValue } : prev;
        });

        setConfirmPassword(prev => {
            const trimmedValue = prev.value.replace(/\s/g, "");
            return trimmedValue !== prev.value ? { ...prev, value: trimmedValue } : prev;
        });
    }, [password.value, confirmPassword.value, setPassword, setConfirmPassword]);

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
                        <CommonInput label="Name" placeholder="Enter your name" value={name.value} error={name.error} type="text" onChange={(val) => setName({ ...name, value: val })} />
                        <CommonInput label="Password" placeholder="Enter your Password" value={password.value} error={password.error} type="password" onChange={(val) => setPassword({ ...password, value: val })} />
                        <CommonInput label="Confirm Password" placeholder="Enter your Password Again" value={confirmPassword.value} error={confirmPassword.error} type="password" onChange={(val) => setConfirmPassword({ ...confirmPassword, value: val })} />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <div>Already have an account? <button onClick={() => router.push('/system/login')} className="cursor-pointer text-blue-500">Login</button></div>
                        <CommonButton variant="primary" onClick={handleSubmit} className="rounded-full text-[12px] h-[40px]">Register</CommonButton>
                        <PasswordChecks checks={passwordChecks} />
                    </div>
                </div>
            </AuthLayout>
        </div>
    )
}