import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Activity, MonitorCheck } from "lucide-react";

export default function Dashboard() {
    return (
        <>
            <section className={"grid grid-cols-2 lg:grid-cols-4 gap-4"}>
                <Card>
                    <CardHeader>
                        <div className={"flex items-center justify-center"}>
                            <CardTitle className={"text-lg sm:text-xl text-gray-800 select-none"}>
                                Active Campaigns
                            </CardTitle>
                            <MonitorCheck className={"ml-auto w-4 h-4"} />
                        </div>
                        <CardDescription>
                            Campaigns in playback
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className={"text-base sm:text-lg font-bold"}>0</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className={"flex items-center justify-center"}>
                            <CardTitle className={"text-lg sm:text-xl text-gray-800 select-none"}>
                                Reach
                            </CardTitle>
                            <Activity className={"ml-auto w-4 h-4"} />
                        </div>
                        <CardDescription>

                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className={"text-base sm:text-lg font-bold"}>0</p>
                    </CardContent>
                </Card>
            </section>
        </>
    );
}
