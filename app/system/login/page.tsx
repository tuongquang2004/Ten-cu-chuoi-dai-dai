"use client"

import AuthLayout from "@/components/AuthLayout";
import CommonButton from "@/components/CommonButton";
import CommonInput from "@/components/CommonInput";
import { Icon } from "@/components/Icon";
import PageHeader from "@/components/PageHeader";
import { useLoginForm } from "../(hooks)/useLoginForm";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const { email, password, setEmail, setPassword, handleSubmit } = useLoginForm();

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