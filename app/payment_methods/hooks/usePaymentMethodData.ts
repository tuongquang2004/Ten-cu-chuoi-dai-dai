import { API } from "@/constants/apiEndpoints";
import { PaymentMethod } from "@/constants/types";
import { useCommonData } from "@/hooks/useCommonData";

export default function usePaymentMethodData() {
  return useCommonData<PaymentMethod>({ apiRoot: API.PAYMENT_METHODS.ROOT });
}
