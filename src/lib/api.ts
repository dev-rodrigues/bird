import axios from "axios";
import {getDecodedData} from "@/services/util.ts";

const api = axios.create({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("@bc.token");
        if (token) {
            const decoded = getDecodedData(token)

            config.headers.companyId = decoded.companyId
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    () => {
        return Promise.reject(new Error("Erro desconhecido na requisição"));
    }
);

export default api;