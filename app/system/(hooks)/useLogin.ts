"use client"

import { API_ERROR, UNKNOWN_ERROR } from "@/constants/errorMessages";
import { ROUTES } from "@/constants/routes";
import { toastMessages } from "@/constants/toastMessages";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export function useLogin() {
    const router = useRouter();

    const handleLogin = async (email: string, password: string) => {
        try {
            await axios.post(ROUTES.LOGIN, { email, password });
            alert(toastMessages.LOGIN);
            router.push(ROUTES.ROOT);
        } catch (err) {
            const error = err as AxiosError<{ error: string }>;
            const status = error.response?.status;

            if (status && API_ERROR[status]) {
                alert(API_ERROR[status]);
            } else {
                alert(UNKNOWN_ERROR);
            }
        }
    };

    return { handleLogin };
}