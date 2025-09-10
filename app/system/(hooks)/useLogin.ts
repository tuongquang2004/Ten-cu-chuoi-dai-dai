"use client"

import { errorMessage } from "@/constants/errorMessage";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export function useLogin() {
    const router = useRouter();

    const handleLogin = async (email: string, password: string) => {
        try {
            await axios.post('/api/auth/login', { email, password });
            alert('Login Successfully');
            router.push('/');
        } catch (err) {
            const error = err as AxiosError<{ error: string }>;
            const status = error.response?.status;
            console.log(`${email} - ${password}`);
            

            if (status && errorMessage[status]) {
                alert(errorMessage[status]);
            } else {
                alert('An unknown error occurred');
            }
        }
    };

    return { handleLogin };
}