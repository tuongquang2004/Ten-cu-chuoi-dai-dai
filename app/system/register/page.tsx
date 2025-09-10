"use client"

import AuthLayout from "@/components/AuthLayout";
import CommonButton from "@/components/CommonButton";
import CommonInput from "@/components/CommonInput";
import { Icon } from "@/components/Icon";
import PageHeader from "@/components/PageHeader";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Register() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;
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
    const [name, setName] = useState<input>({ value: '', error: '' });
    const [password, setPassword] = useState<input>({ value: '', error: '' });
    const [confirmPassword, setConfirmPassword] = useState<input>({ value: '', error: '' });
    const [passwordChecks, setPasswordChecks] = useState<checks>({ length: false, upper: false, digit: false, special: false });
    const router = useRouter();

    const handleSubmit = () => {
        let submit = true;
        const trimmedEmail = email.value.trim();
        const trimmedName = name.value.trim();
        const trimmedPassword = password.value.trim();
        const trimmedConfirmPassword = confirmPassword.value.trim();

        if (trimmedEmail.length === 0) {
            setEmail({ value: trimmedEmail, error: 'Please enter your email' })
        } else if (!emailRegex.test(trimmedEmail)) {
            setEmail({ value: trimmedEmail, error: 'The email is not valid' })
            submit = false;
        } else {
            setEmail({ value: trimmedEmail, error: '' });
        }

        if (trimmedName.length === 0) {
            setName({ value: trimmedName, error: 'Please enter your name' })
        } else {
            setName({ value: trimmedName, error: '' })
        }

        if (trimmedPassword.length === 0) {
            setPassword({ value: trimmedPassword, error: 'Please enter a password' })
        } else {
            setPassword({ value: trimmedPassword, error: '' })
        }

        submit = checkPassword(trimmedPassword);

        if (submit) {
            if (password.value !== confirmPassword.value) {
                setConfirmPassword({ value: trimmedConfirmPassword, error: 'This password does not match the one you entered above' });
                submit = false
            }
            if (submit) {
                setConfirmPassword({ value: trimmedConfirmPassword, error: '' });
                handleRegister(trimmedEmail, trimmedName, trimmedPassword);
            }
        }
    }

    const checkPassword = (password: string) => {
        const passwordError = 'Please meet all password requirements';
        const checks = {
            length: password.length >= 8,
            upper: uppercaseRegex.test(password),
            digit: numberRegex.test(password),
            special: specialCharRegex.test(password)
        }
        setPasswordChecks({ ...checks });
        const hasFalse = Object.values(checks).some(v => !v);
        if (hasFalse) {
            setConfirmPassword({ value: password, error: passwordError });
            return false;
        }
        return true;
    }

    const handleRegister = async (email: string, name: string, password: string) => {
        try {
            await axios.post('/api/auth/register', {
                email: email,
                name: name,
                password: password
            })
            localStorage.setItem('userAccount', JSON.stringify({ email: email, name: name }))
            alert('Registered Successfully');
            router.push('/')
        } catch (err) {
            const error = err as AxiosError<{ error: string }>;
            if (error.response?.status === 400) {
                alert('Please enter all required fields')
            }
            else if (error.response?.status === 409) {
                alert('This email already exists')
            }
            else {
                alert('Unknown error occured')
            }
        }
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
                        <CommonInput label="Name" placeholder="Enter your name" value={name.value} error={name.error} type="text" onChange={(val) => setName({ ...name, value: val })} />
                        <CommonInput label="Password" placeholder="Enter your Password" value={password.value} error={password.error} type="password" onChange={(val) => setPassword({ ...password, value: val })} />
                        <CommonInput label="Confirm Password" placeholder="Enter your Password Again" value={confirmPassword.value} error={confirmPassword.error} type="password" onChange={(val) => setConfirmPassword({ ...confirmPassword, value: val })} />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <div>Already have an account? <button onClick={() => router.push('/system/login')} className="cursor-pointer text-blue-500">Login</button></div>
                        <CommonButton variant="primary" onClick={handleSubmit} className="rounded-full text-[12px] h-[40px]">Register</CommonButton>
                    </div>
                </div>
            </AuthLayout>
        </div>
    )
}