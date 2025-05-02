import {useQuery} from "@tanstack/react-query";
import api from "@/lib/api.ts";

export interface BankBalance {
    balance: number;
}

export function useBankBalance() {
    return useQuery({
        queryKey: ['bank-balance'],
        queryFn: async () => {
            const response = await api.get<BankBalance>(`/bank-balance`);
            return response.data;
        }
    });
}