import { Route, Routes } from "react-router";
import IndexPage from "./index-page";
import AboutPage from "./about";

export default function AppRoutes() {
  return(
    <Routes>
      <Route index element={<IndexPage />} />
      <Route path="about" element={<AboutPage />} />
    </Routes>
  )
}