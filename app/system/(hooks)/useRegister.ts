import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toastMessages } from "@/constants/toastMessages";
import { errorMessage } from "@/constants/errorMessage";

export function useRegister() {
    const router = useRouter();

    const handleRegister = async (email: string, name: string, password: string) => {
        try {
            await axios.post('/api/auth/register', {
                email: email,
                name: name,
                password: password
            })
            alert(toastMessages.register);
            router.push('/system/login');
            alert(toastMessages.afterRegister);
        } catch (err) {
            const error = err as AxiosError<{ error: string }>;
            const status = error.response?.status;

            if (status && errorMessage[status]) {
                alert(errorMessage[status]);
            } else {
                alert('An unknown error occurred');
            }
        }
    }
    return { handleRegister }
}