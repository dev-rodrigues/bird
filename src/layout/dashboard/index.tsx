import {Outlet} from "react-router";
import {Sidebar} from "@/components/sidebar";

export function DashboardLayout() {
    return (
        <div className={"min-h-screen bg-background font-sans"}>
            <Sidebar/>

            <Outlet />
        </div>
    )
}