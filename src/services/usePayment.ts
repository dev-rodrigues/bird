import {useQuery} from "@tanstack/react-query";
import api from "@/lib/api.ts";

export interface PaymentProps {
    id: number;
    amount: number;
    createdAt: string;
    status: string;
}

export function usePayment() {
    return useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const response =
                await api.get<PaymentProps[]>("/payments")

            return response.data
        }
    })
}