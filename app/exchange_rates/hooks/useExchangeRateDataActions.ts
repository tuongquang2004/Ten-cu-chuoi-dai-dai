export function useExchangeRateDataActions() {
    const getRate = (id: string) => {
        console.log(`Rate id: ${id}`);
    }

    return { getRate };
}