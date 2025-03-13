import {SignInProps} from "@/context/AuthContext.tsx";
import api from "@/lib/api.ts";
import {AxiosError} from "axios";

interface AuthResponse {
    token: string;
}

export async function auth({user, password}: SignInProps): Promise<AuthResponse> {
    delete api.defaults.headers.common.Authorization;
    const response = await api.post<AuthResponse>(
            "/sessions",
            {login: user, password: password},
        )
    ;
    return response.data;
}

export async function checkToken(): Promise<boolean> {
    try {
        await api.get<void>("/sessions");
        return true;
    } catch (error: unknown) {
        if (error instanceof AxiosError && error.response?.status === 403) {
            return false;
        }
        throw error;
    }
}

export function isAdmin(role?: string[]): boolean {
    if (!role) {
        return false
    }

    return role.some((role) => role === "ADMIN");
}