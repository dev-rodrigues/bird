import {ReactNode} from "react";
import {LocalizationProps} from "@/components/steps/campaing/CampaignLocalizationStep.tsx";

export interface StepData {
    objective?: string;
    budget?: {
        name: string;
        type: string;
        amount: number;
        schedule_start: string;
        schedule_end: string;
    };
    localization?: LocalizationProps[];
    resume?: {
        summary: string;
    };
    medias?: []
}

export interface Step<K extends keyof StepData> {
    label: string;
    component: (props: StepComponentProps<K>) => ReactNode;
    key: K;
}

export interface StepComponentProps<K extends keyof StepData> {
    data: StepData[K];
    updateData: (data: StepData[K]) => void;
    state: StepData
}