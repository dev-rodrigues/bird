import { Route, Routes } from "react-router";
import Index from "./pages";
import AboutPage from "./pages/about.tsx";
import {DashboardLayout} from "@/layout/dashboard";
import Dashboard from "@/pages/dashboard.tsx";
import Campaign from "@/pages/campaign.tsx";
import Financial from "@/pages/financial.tsx";
import Map from "./pages/map.tsx";
import NotFound from "./pages/notFound.tsx";
import {CampaignDetail} from "@/pages/campaignDetail.tsx";

export default function AppRoutes() {
  return(
    <Routes>
      <Route index element={<Index />} />
      <Route element={<DashboardLayout />}>
          <Route index path={"dashboard"} element={<Dashboard />}/>
          <Route index path={"campaign"} element={<Campaign />}/>
          <Route index path={"campaign/:id"} element={<CampaignDetail />}/>
          <Route index path={"financial"} element={<Financial />}/>
          <Route index path={"map"} element={<Map />}/>
          <Route path="*" element={<NotFound />}/>
      </Route>
      <Route path="about" element={<AboutPage />} />
    </Routes>
  )
}