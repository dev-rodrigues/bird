import {Outlet} from "react-router";

export function DashboardLayout() {
    return (
        <div className={"min-h-screen bg-background font-sans"}>
            <Outlet />
        </div>
    )
}