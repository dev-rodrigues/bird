import axios from "axios";
import {getDecodedData} from "@/services/util.ts";

const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("@bc.token");
        if (token) {
            const decoded = getDecodedData(token)

            config.headers.companyId = decoded.id
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (_) => {
        return Promise.reject(new Error("Erro desconhecido na requisição"));
    }
);

export default api;