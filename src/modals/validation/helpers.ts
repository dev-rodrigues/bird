import {StepData} from "@/modals/CreateCampaignDialogTypes.ts";

export function isObjectiveValid(data: StepData["objective"]): boolean {
    return typeof data === "string" && data.trim().length > 0;
}

export function isBudgetValid(data: StepData["budget"]): boolean {
    if (!data) return false;
    return (
        data.name.trim().length > 0 &&
        data.type.trim().length > 0 &&
        data.amount > 0 &&
        data.schedule_start.trim().length > 0 &&
        data.schedule_end.trim().length > 0
    );
}

export function isMediasValid(data: StepData["medias"]): boolean {
    return data instanceof File && data.size > 0;
}

export function isLocalizationValid(data: StepData["localization"]): boolean {
    return Array.isArray(data) && data.length > 0;
}

export function isResumeValid(data: StepData["resume"]): boolean {
    return data !== undefined && data.summary.trim().length > 0;
}
