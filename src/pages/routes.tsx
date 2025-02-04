import { Route, Routes } from "react-router";
import Index from "./index.tsx";
import AboutPage from "./about";
import Dashboard from "@/pages/dashboard.tsx";

export default function AppRoutes() {
  return(
    <Routes>
      <Route index element={<Index />} />
      <Route path={"/dashboard"} element={<Dashboard />} />
      <Route path="about" element={<AboutPage />} />
    </Routes>
  )
}