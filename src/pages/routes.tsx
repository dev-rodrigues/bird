import { Route, Routes } from "react-router";
import Index from "./index.tsx";
import AboutPage from "./about";
import {DashboardLayout} from "@/layout/dashboard";
import Dashboard from "@/pages/dashboard.tsx";

export default function AppRoutes() {
  return(
    <Routes>
      <Route index element={<Index />} />
      <Route element={<DashboardLayout />}>
          <Route index path={"dashboard"} element={<Dashboard />}/>
      </Route>
      <Route path="about" element={<AboutPage />} />
    </Routes>
  )
}