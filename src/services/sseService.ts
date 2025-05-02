import api from "@/lib/api.ts";

export async function createCampaign(clientId: string, data: string): Promise<void> {
    await api.post(`/sse/send/${clientId}`, {
        action: data
    });
}