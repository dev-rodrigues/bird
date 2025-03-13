import {useEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {StepComponentProps} from "@/modals/CreateCampaignDialogTypes.ts";
import * as React from "react";
import {toast} from "sonner"; // Importando o Sonner

export default function CampaignMediasStep({data, updateData}: StepComponentProps<"medias">) {
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
            const allowedTypes = ["video/mp4", "video/quicktime"]; // MP4 e MOV
            if (!allowedTypes.includes(file.type)) {
                toast.error("O formato de vídeo não é suportado. Envie um arquivo MP4 ou MOV.");
                return;
            }

            const video = document.createElement("video");
            video.preload = "metadata";
            video.src = URL.createObjectURL(file);

            video.onloadedmetadata = () => {
                URL.revokeObjectURL(video.src);
                if (video.duration > 15) {
                    toast.error("O vídeo selecionado excede o limite de 15 segundos.");
                    setSelectedFile(null);
                    if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                    }
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
                    <Label className={"bg-neutral-200 rounded p-2"} htmlFor="video">Select a file</Label>
                    <Input
                        className={"bg-neutral-200"}
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

                <div className="w-full">
                    {videoPreview ? (
                        <video
                            className="w-full max-h-[200px] rounded-lg border border-neutral-600"
                            controls
                            muted
                            controlsList="nodownload nofullscreen noremoteplayback"
                            disablePictureInPicture
                        >
                            <source
                                src={videoPreview}
                                type={selectedFile?.type === "video/quicktime" ? "video/mp4" : selectedFile?.type}
                            />
                            Your browser does not support video playback.
                        </video>
                    ) : (
                        <div
                            className="flex items-center justify-center h-40 bg-gray-100 rounded-lg border border-neutral-600"
                        >
                            <span className="text-gray-500">Video preview will appear here.</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
