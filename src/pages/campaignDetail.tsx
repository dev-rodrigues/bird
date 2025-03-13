import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useParams} from "react-router";
import {useCampaign, useCampaignMedia} from "@/services/campaignService.ts";
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

export function CampaignDetail() {

    const {user} = useAuth();

    const {id} = useParams<{ id: string }>();
    const campaignId = Number(id);

    const {data} = useCampaign(campaignId)
    const {data: media} = useCampaignMedia(data?.fileId)

    const admin = isAdmin(user?.role)

    return (
        <Tabs defaultValue="detail">
            <TabsList>
                <TabsTrigger value={"detail"}>Details</TabsTrigger>
                <TabsTrigger value={"media"}>Media</TabsTrigger>
                <TabsTrigger value={"localizations"}>Localizations</TabsTrigger>
                <TabsTrigger value={"config"} disabled={!admin}>Config</TabsTrigger>
            </TabsList>
            <TabsContent value={"detail"}>
                <Card>
                    <CardHeader>
                        <CardTitle>Detail</CardTitle>
                    </CardHeader>
                    <CardContent className={"space-y-2"}>
                        <div className="space-y-1">
                            <Label htmlFor="name">Status</Label>
                            <Input
                                value={data?.status}
                                id="name" disabled defaultValue="Pedro Duarte"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="name">Ad name</Label>
                            <Input
                                value={data?.adName}
                                id="name" disabled defaultValue="Pedro Duarte"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="name">Objective</Label>
                            <Input
                                value={data?.objective}
                                id="name" disabled defaultValue="Pedro Duarte"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="name">Budget Type</Label>
                            <Input
                                value={data?.budgetType}
                                id="name" disabled defaultValue="Pedro Duarte"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="name">Budget Value</Label>
                            <Input
                                value={data?.budgetValue}
                                id="name" disabled defaultValue="Pedro Duarte"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="name">Start date</Label>
                            <Input
                                value={data?.startDate}
                                id="name" disabled defaultValue="Pedro Duarte"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="name">End date</Label>
                            <Input
                                value={data?.endDate}
                                id="name" disabled defaultValue="Pedro Duarte"
                            />
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value={"media"}>
                <Card>
                    <CardHeader>
                        <CardTitle>Media</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full">
                            <video
                                className="w-full h-full rounded-lg border border-neutral-600" controls
                                muted
                                controlsList="nodownload nofullscreen noremoteplayback"
                                disablePictureInPicture
                            >
                                <source
                                    src={media ? URL.createObjectURL(media) : ""}
                                    type="video/mp4"
                                />
                                Your browser does not support video playback.
                            </video>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value={"localizations"}>
                <Table>
                    <TableCaption>List of points view</TableCaption>
                    <TableHeader>
                        <TableHead>Name</TableHead>
                        <TableHead>Latitude</TableHead>
                        <TableHead>Longitude</TableHead>
                    </TableHeader>
                    <TableBody>
                        {data?.totems.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell>{item.latitude}</TableCell>
                                <TableCell>{item.longitude}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TabsContent>
            <TabsContent value={"config"}>
                <Card>
                    <CardHeader>
                        <CardTitle>Configure</CardTitle>
                    </CardHeader>
                    <CardContent className={"space-y-2"}>
                        <div className="space-y-1">
                            <Label htmlFor="name">Status</Label>
                            <Input
                                value={data?.status}
                                id="name" disabled defaultValue="Pedro Duarte"
                            />
                        </div>

                        <div className="space-y-1">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="secondary">Configure</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>Settings for ad veiculation</DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuGroup>
                                        <DropdownMenuSub>
                                            <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
                                            <DropdownMenuPortal>
                                                <DropdownMenuSubContent>
                                                    <DropdownMenuItem>APPROVED</DropdownMenuItem>
                                                    <DropdownMenuItem>INACTIVE</DropdownMenuItem>
                                                    <DropdownMenuItem>DENIED</DropdownMenuItem>
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