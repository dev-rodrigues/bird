import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useParams} from "react-router";
import {configureStatus, useCampaign, useCampaignMedia} from "@/services/campaignService.ts";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {useAuth} from "@/context/AuthContext.tsx";
import {isAdmin} from "@/services/authService.ts";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "@/main.tsx";
import {toast} from "sonner";
import {useEffect, useState} from "react";
import {CampaignDetailReason} from "@/modals/CampaignDetailReason.tsx";
import ReactPlayer from "react-player";

// Define types explicitly
interface CampaignDetail {
    status: string;
    adName: string;
    objective: string;
    budgetType: string;
    budgetValue: string;
    startDate: string;
    endDate: string;
    fileId?: string;
    totems?: { name: string; latitude: number; longitude: number }[];
}

export function CampaignDetail() {
    const [showCampaignDetailReason, setShowCampaignDetailReason] = useState(false);
    const {user} = useAuth();
    const {id} = useParams<{ id: string }>();
    const campaignId = Number(id);

    // Ensure correct typing for the campaign data
    const {data} = useCampaign(campaignId);
    const {data: media} = useCampaignMedia(data?.fileId);

    const admin = isAdmin(user?.role);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    useEffect(() => {
        if (media) {
            const url = URL.createObjectURL(media);
            setVideoUrl(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [media]);

    const {mutate} = useMutation({
        mutationFn: ({id, status, reason}: { id: number; status: string; reason?: string }) =>
            configureStatus(id, status, reason),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["campaigns", campaignId]})
                .catch(() => {
                    toast.error("Error invalidating campaign query");
                })
                .finally(() => {
                    toast.success("Campaign updated successfully");
                });
        }
    });

    const handleConfigure = (status: string) => {
        mutate({id: campaignId, status});
    };

    function handleOpenCampaignDetailReason() {
        setShowCampaignDetailReason(!showCampaignDetailReason);
    }

    // Fields with strong typing
    const campaignFields: (keyof CampaignDetail)[] = [
        "status",
        "adName",
        "objective",
        "budgetType",
        "budgetValue",
        "startDate",
        "endDate"
    ];

    return (
        <Tabs defaultValue="detail">
            <TabsList>
                <TabsTrigger value="detail">Details</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="localizations">Localizations</TabsTrigger>
                <TabsTrigger value="config" disabled={!admin}>Config</TabsTrigger>
            </TabsList>
            <TabsContent value="detail">
                <Card>
                    <CardHeader>
                        <CardTitle>Detail</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {campaignFields.map(field => (
                            <div key={field} className="space-y-1">
                                <Label htmlFor={field}>{field}</Label>
                                <Input
                                    value={
                                        Array.isArray(data?.[field])
                                            ? JSON.stringify(data?.[field])
                                            : data?.[field] ?? ""
                                    }
                                    id={field}
                                    disabled
                                />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="media">
                <Card>
                    <CardHeader>
                        <CardTitle>Media</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative w-full" style={{paddingTop: "56.25%"}}>
                            {videoUrl ? (
                                <ReactPlayer
                                    url={videoUrl}
                                    playing
                                    loop
                                    muted
                                    width="100%"
                                    height="100%"
                                    className="absolute top-0 left-0 w-full h-full"
                                    config={{
                                        file: {attributes: {controlsList: "nodownload nofullscreen noremoteplayback"}}
                                    }}
                                />
                            ) : (
                                <div
                                    className="flex items-center justify-center h-full bg-gray-100 rounded-lg border border-neutral-600"
                                >
                                    <span className="text-gray-500">Video preview will appear here.</span>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="localizations">
                <Table>
                    <TableCaption>List of points view</TableCaption>
                    <TableHeader>
                        <TableHead>Name</TableHead>
                        <TableHead>Latitude</TableHead>
                        <TableHead>Longitude</TableHead>
                    </TableHeader>
                    <TableBody>
                        {data?.totems?.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell>{item.latitude}</TableCell>
                                <TableCell>{item.longitude}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TabsContent>
            <TabsContent value="config">
                <CampaignDetailReason isOpenModal={showCampaignDetailReason}
                                      setIsOpenModal={handleOpenCampaignDetailReason}
                                      campaignId={campaignId}
                />
                <Card>
                    <CardHeader>
                        <CardTitle>Configure</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="status">Status</Label>
                            <Input value={data?.status ?? ""} id="status" disabled/>
                        </div>
                        <div className="space-y-1">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="secondary">Configure</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>Settings for ad veiculation</DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuGroup>
                                        <DropdownMenuSub>
                                            <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
                                            <DropdownMenuPortal>
                                                <DropdownMenuSubContent>
                                                    <DropdownMenuItem disabled={!admin}
                                                                      onClick={() => handleConfigure('APPROVED')}
                                                    >
                                                        APPROVED
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleConfigure('INACTIVE')}>
                                                        INACTIVE
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={handleOpenCampaignDetailReason}>
                                                        DENIED
                                                    </DropdownMenuItem>
                                                </DropdownMenuSubContent>
                                            </DropdownMenuPortal>
                                        </DropdownMenuSub>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
