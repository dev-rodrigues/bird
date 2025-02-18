import api from "@/services/api.ts";

export interface CompanyData {
    companyName: string;
    fantasyName: string;
    cnpj: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

export async function createCompany(data: CompanyData): Promise<CompanyData> {
    const response = await api.post<CompanyData>("/companies", data);
    return response.data;
}