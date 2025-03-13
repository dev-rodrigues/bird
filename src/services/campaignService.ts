import api from "@/lib/api.ts";
import {StepData} from "@/modals/CreateCampaignDialogTypes.ts";
import {useQuery} from "@tanstack/react-query";
import {CampaignProps} from "@/pages/campaign.tsx";
import {CampaignDetail} from "@/services/types/campaignDetail.ts";

export interface BudgetDto {
    name: string;
    type: string;
    amount: number;
    schedule_start: string;
    schedule_end: string;
}

export interface LocalizationDto {
    latitude: number;
    longitude: number;
    name: string;
}

export interface CampaignData {
    objective: string;
    budget: BudgetDto;
    localization: LocalizationDto[];
    file?: File
}

export interface ConsultCampaignData {
    content: CampaignProps[],
    page: number,
    size: number,
}

export async function createCampaign(data: FormData): Promise<void> {
    await api.post<CampaignData>("/campaigns", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

export function useCampaigns(page: number, size: number) {
    return useQuery({
        queryKey: ['campaigns', page, size],
        queryFn: async () => {
            const response = await api.get<ConsultCampaignData>(`/campaigns?page=${page}&size=${size}`);
            return response.data;
        }
    });
}

export function useCampaign(id: number) {
    return useQuery({
        queryKey: ['campaigns', id],
        queryFn: async () => {
            const response = await api.get<CampaignDetail>(`/campaigns/${id}`);
            return response.data;
        }
    })
}

export function useCampaignMedia(id?: number | null) {
    return useQuery({
        queryKey: ['media', id],
        queryFn: async () => {
            if (!id) {
                return null;
            }
            const response = await api.get<Blob>(`/media/${id}`, {
                responseType: 'blob'
            });
            return response.data;
        },
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });
}

export function mapStepDataToCampaignData(data: StepData): CampaignData {
    if (!data.budget) {
        throw new Error("Budget data is required");
    }

    return {
        objective: data.objective ?? "",
        budget: {
            name: data.budget.name ?? "",
            type: data.budget.type ?? "",
            amount: data.budget.amount ?? 0,
            schedule_start: data.budget.schedule_start ?? "",
            schedule_end: data.budget.schedule_end ?? "",
        },
        localization: data.localization ?? []
    };
}