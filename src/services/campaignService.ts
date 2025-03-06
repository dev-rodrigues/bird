import api from "@/lib/api.ts";
import {StepData} from "@/modals/CreateCampaignDialogTypes.ts";
import {useQuery} from "@tanstack/react-query";
import {CampaignProps} from "@/pages/campaign.tsx";

export interface BudgetDto {
    name: string;
    type: string;
    amount: number;
    schedule_start: string;
    schedule_end: string;
}

export interface LocalizationDto {
    lat: number;
    lng: number;
    name: string;
}

export interface CampaignData {
    objective: string;
    budget: BudgetDto;
    localization: LocalizationDto[];
}

export interface ConsultCampaignData {
    content: CampaignProps[],
    page: number,
    size: number,
}

export async function createCampaign(data: CampaignData): Promise<void> {
    const response = await api.post<CampaignData>("/campaigns/4", data);
    console.log(response);
}

export function useCampaigns(page: number, size: number) {
    return useQuery({
        queryKey: ['campaigns', page, size],
        queryFn: async () => {
            const response = await api.get<ConsultCampaignData>(`/campaigns/4?page=${page}&size=${size}`);
            return response.data;
        }
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