import {useEffect} from "react";
import {Navigate, Outlet, useLocation} from "react-router";
import {Sidebar} from "@/components/sidebar";
import {useAuth} from "@/context/AuthContext.tsx";

export function DashboardLayout() {
    const location = useLocation();
    const {user, invalidToken: checkInvalidToken, logout: handleLogout} = useAuth();

    useEffect(() => {
        const verifyToken = async () => {
            const isValid = await checkInvalidToken();
            if (!isValid) {
                handleLogout();
            }
        };

        void verifyToken();

    }, [location.pathname, checkInvalidToken, handleLogout]);

    return user ? (
        <div className={"min-h-screen bg-background font-sans"}>
            <Sidebar/>

            <main className={"sm:ml-14 p-4"}>
                <Outlet/>
            </main>
        </div>
    ) : (
        <Navigate
            to={'/'}
            replace
            state={{
                from: location,
            }}
        />
    );
}