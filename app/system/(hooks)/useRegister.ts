import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toastMessages } from "@/constants/toastMessages";
import { API_ERROR, UNKNOWN_ERROR } from "@/constants/errorMessages";
import { ROUTES } from "@/constants/routes";
import { API } from "@/constants/apiEndpoints";

export function useRegister() {
    const router = useRouter();

    const handleRegister = async (email: string, name: string, password: string) => {
        try {
            await axios.post(API.AUTH.REGISTER, {
                email: email,
                name: name,
                password: password
            })
            alert(toastMessages.REGISTER);
            router.push(ROUTES.LOGIN);
            alert(toastMessages.REDIRECT_AFTER_REGISTER);
        } catch (err) {
            const error = err as AxiosError<{ error: string }>;
            const status = error.response?.status;

            if (status && API_ERROR[status]) {
                alert(API_ERROR[status]);
            } else {
                alert(UNKNOWN_ERROR);
            }
        }
    }
    return { handleRegister }
}