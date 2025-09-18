import { API } from "@/constants/apiEndpoints";
import { ExchangeRate } from "@/constants/types";
import axios from "axios";

export function useExchangeRateActions(
  setItems: React.Dispatch<React.SetStateAction<ExchangeRate[]>>
) {
  const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY;

  const getRate = () => {
    console.log(API_KEY);
  };

  const changeStatus = async (id: string, newStatus: boolean) => {
    try {
      const res = await axios.patch(API.EXCHANGE_RATES.BY_ID(id), {
        isActive: newStatus,
      });
      if (res) {
        alert("Changed status successfully");
        console.log(res.data);

        setItems((prev) =>
          prev.map((item) => (item.id === id ? res.data : item))
        );
      }
    } catch {}
  };

  return { getRate, changeStatus };
}
