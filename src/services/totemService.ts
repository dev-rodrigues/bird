import api from "@/lib/api.ts";
import {useQuery} from "@tanstack/react-query";
import {Totem} from "@/pages/map.tsx";

export const createTotem = async (
    data: { name: string; latitude: string; longitude: string }): Promise<void> => {
    await api.post('/totem', data)
};

export function useCampaigns() {
    return useQuery({
        queryKey: ['totem'],
        queryFn: async () => {
            const response = await api.get<Totem[]>(`/totem`);
            return response.data;
        }
    });
}
