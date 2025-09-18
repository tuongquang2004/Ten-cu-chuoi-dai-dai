import { API } from "@/constants/apiEndpoints";
import { ExchangeRate } from "@/constants/types";
import { useCommonData } from "@/hooks/useCommonData";

export function useExchangeRateData() {
  return useCommonData<ExchangeRate>({ apiRoot: API.EXCHANGE_RATES.ROOT });
}
