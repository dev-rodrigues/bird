import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepComponentProps } from "@/modals/CreateCampaignDialogTypes.ts";
import * as React from "react";
import { toast } from "sonner";
import ReactPlayer from "react-player";

export default function CampaignMediasStep({ data, updateData }: StepComponentProps<"medias">) {
    const [selectedFile, setSelectedFile] = useState<File | null>(data ?? null);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (data instanceof File) {
            setSelectedFile(data);
        } else {
            setSelectedFile(null);
        }
    }, [data]);

    useEffect(() => {
        if (selectedFile !== data) {
            updateData(selectedFile ?? undefined);
        }
    }, [selectedFile, data]);

    useEffect(() => {
        if (selectedFile) {
            const videoURL = URL.createObjectURL(selectedFile);
            setVideoPreview(videoURL);

            return () => {
                URL.revokeObjectURL(videoURL);
            };
        } else {
            setVideoPreview(null);
        }
    }, [selectedFile]);

    const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const allowedTypes = ["video/mp4", "video/quicktime"];
            if (!allowedTypes.includes(file.type)) {
                toast.error("O formato de vídeo não é suportado. Envie um arquivo MP4 ou MOV.");
                return;
            }

            const videoURL = URL.createObjectURL(file);
            const player = new Audio(videoURL);
            player.onloadedmetadata = () => {
                if (player.duration > 15) {
                    toast.error("O vídeo selecionado excede o limite de 15 segundos.");
                    setSelectedFile(null);
                    if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                    }
                    URL.revokeObjectURL(videoURL);
                } else {
                    setSelectedFile(file);
                }
            };
        }
    };

    const handleRemoveVideo = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
                <div className="grid w-full items-center gap-1.5">
                    <Label className="bg-neutral-200 rounded p-2" htmlFor="video">
                        Select a file
                    </Label>
                    <Input
                        className="bg-neutral-200"
                        id="video"
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
                        disabled={!!selectedFile}
                        ref={fileInputRef}
                    />
                    {selectedFile && (
                        <Button
                            type="button"
                            onClick={handleRemoveVideo}
                            className="mt-2 bg-red-500 hover:bg-red-600 text-white"
                        >
                            Remove
                        </Button>
                    )}
                </div>

                {/* Player Container - Garante que o vídeo preenche 100% do espaço corretamente */}
                <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                    {videoPreview ? (
                        <ReactPlayer
                            url={videoPreview}
                            playing
                            loop
                            muted
                            width="100%"
                            height="100%"
                            className="absolute top-0 left-0 w-full h-full"
                            config={{
                                file: {
                                    attributes: { controlsList: "nodownload nofullscreen noremoteplayback" }
                                }
                            }}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg border border-neutral-600">
                            <span className="text-gray-500">Video preview will appear here.</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
