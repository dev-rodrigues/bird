import {Outlet} from "react-router";
import {Sidebar} from "@/components/sidebar";

export function DashboardLayout() {
    return (
        <div className={"min-h-screen bg-background font-sans"}>
            <Sidebar/>

            <main className={"sm:ml-14 p-4"}>
                <Outlet/>
            </main>
        </div>
    )
}