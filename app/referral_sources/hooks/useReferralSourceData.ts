import { API } from "@/constants/apiEndpoints";
import { RefSrc } from "@/constants/types";
import { useCommonData } from "@/hooks/useCommonData";

export function useReferralSourceData() {
  return useCommonData<RefSrc>({
    apiRoot: API.REF.ROOT,
  });
}
