import { API } from "@/constants/apiEndpoints";
import { ShippingMethod } from "@/constants/types";
import { useCommonData } from "@/hooks/useCommonData";

export function useShippingMethodData() {
    return useCommonData<ShippingMethod>({apiRoot:API.SHIPPING_METHODS.ROOT});
}