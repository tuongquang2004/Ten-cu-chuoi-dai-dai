"use client"

import AuthLayout from "@/components/AuthLayout";
import CommonButton from "@/components/CommonButton";
import CommonInput from "@/components/CommonInput";
import { Icon } from "@/components/Icon";
import PageHeader from "@/components/PageHeader";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    type input = {
        value: string,
        error: string
    }

    const [email, setEmail] = useState<input>({ value: '', error: '' });
    const [password, setPassword] = useState<input>({ value: '', error: '' });

    const router = useRouter();

    const handleSubmit = () => {
        const trimmedEmail = email.value.trim();
        const trimmedPassword = password.value.trim();
        let submit = true;

        if (trimmedEmail.length === 0) {
            setEmail({ value: trimmedEmail, error: 'Please enter your email' })
            submit = false;
        } else if (!emailRegex.test(trimmedEmail)) {
            setEmail({ value: trimmedEmail, error: 'Please enter a valid email' })
            submit = false;
        }

        if (trimmedPassword.length === 0) {
            setPassword({ value: trimmedPassword, error: 'Please enter your password' })
            submit = false;
        }

        if (submit) {
            setEmail({ value: trimmedEmail, error: '' })
            setPassword({ value: trimmedPassword, error: '' })
            handleLogin(trimmedEmail, trimmedPassword);
        }
    }

    const handleLogin = async (email: string, password: string) => {
        try {
            await axios.post('/api/auth/login', { email: email, password: password });
            alert('Login Succesfully')
            router.push('/');
        } catch (err) {
            const error = err as AxiosError<{ error: string }>;
            if (error.response?.status === 400) {
                alert('Please fill all required fields')
            }
            else if (error.response?.status === 401) {
                alert('Incorrect email or password')
            }
            else {
                alert('Unknown error occured')
            }
        }
    }

    return (
        <div>
            <AuthLayout>
                <div className="flex flex-col justify-center gap-8 w-full">
                    <div className="flex justify-start">
                        <Icon.Logo />
                    </div>
                    <PageHeader title="Login" subtitle="Please login with yor email address and password" titleColor="#252C88" subtitleColor="#475467" size="xl" />
                    <div className="flex flex-col gap-4 w-full">
                        <CommonInput label="Email Address" placeholder="Enter your email address" value={email.value} error={email.error} type="email" onChange={(val) => setEmail({ ...email, value: val })} />
                        <CommonInput label="Password" placeholder="Enter your Password" value={password.value} error={password.error} type="password" onChange={(val) => setPassword({ ...password, value: val })} />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <div>Do not have an account? <button onClick={() => router.push('/system/register')} className="cursor-pointer text-blue-500">Register</button></div>
                        <CommonButton variant="primary" onClick={handleSubmit} className="rounded-full text-[12px] h-[40px]">Login</CommonButton>
                    </div>
                </div>
            </AuthLayout>
        </div>
    )
}