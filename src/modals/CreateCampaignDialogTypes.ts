import {ReactNode} from "react";

export interface StepData {
    objective?: string;
    budget?: {
        type: string;
        amount: number;
        schedule_start: string;
        schedule_end: string;
    };
    localization?: string[];
    resume?: {
        summary: string;
    };
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