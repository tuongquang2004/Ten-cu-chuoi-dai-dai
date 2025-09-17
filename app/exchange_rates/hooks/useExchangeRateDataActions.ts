export function useExchangeRateDataActions() {
    const getRate = (id: string) => {
        console.log(`Rate id: ${id}`);
    }

    const changeStatus = (id: string | undefined) => {

    }

    return { getRate, changeStatus };
}