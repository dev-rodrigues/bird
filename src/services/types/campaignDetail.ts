export interface Company {
    id: number;
    companyName: string;
    fantasyName: string;
    cnpj: string;
    email: string;
    phone: string;
}

export interface Totem {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    enabled: boolean;
}

export interface CampaignDetail {
    id: number;
    adName: string;
    objective: string;
    budgetType: string;
    budgetValue: number;
    startDate: string;
    endDate: string;
    status: string;
    createdAt: string;
    fileId: number | null;
    company: Company;
    totems: Totem[];
}