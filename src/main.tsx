import {createRoot} from 'react-dom/client'
import {StrictMode} from 'react'
import {BrowserRouter} from 'react-router'
import AppRoutes from './routes.tsx'
import 'leaflet/dist/leaflet.css';


import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "sonner";

export const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AppRoutes/>
                <Toaster />
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>,
)
