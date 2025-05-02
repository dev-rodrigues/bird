import {useEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {StepComponentProps} from "@/modals/CreateCampaignDialogTypes.ts";
import * as React from "react";
import {toast} from "sonner";
import ReactPlayer from "react-player";

export default function CampaignMediasStep({data, updateData}: StepComponentProps<"medias">) {
    const [selectedFile, setSelectedFile] = useState<File | null>(data ?? null);
    const [preview, setPreview] = useState<string | null>(null);
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
            const fileURL = URL.createObjectURL(selectedFile);
            setPreview(fileURL);

            return () => {
                URL.revokeObjectURL(fileURL);
            };
        } else {
            setPreview(null);
        }
    }, [selectedFile]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const isVideo = file.type.startsWith("video/");
        const isImage = file.type.startsWith("image/");

        if (!isVideo && !isImage) {
            toast.error("Formato de mídia não suportado. Envie um vídeo ou imagem.");
            return;
        }

        if (isVideo) {
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
        } else {
            setSelectedFile(file); // Imagens não precisam de verificação de duração
        }
    };

    const handleRemoveMedia = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
                <div className="grid w-full items-center gap-1.5">
                    <Label className="bg-neutral-200 rounded p-2" htmlFor="media">
                        Selecione um vídeo ou imagem
                    </Label>
                    <Input
                        className="bg-neutral-200"
                        id="media"
                        type="file"
                        accept="video/*,image/*"
                        onChange={handleFileChange}
                        disabled={!!selectedFile}
                        ref={fileInputRef}
                    />
                    {selectedFile && (
                        <Button
                            type="button"
                            onClick={handleRemoveMedia}
                            className="mt-2 bg-red-500 hover:bg-red-600 text-white"
                        >
                            Remover
                        </Button>
                    )}
                </div>

                <div className="relative w-full" style={{paddingTop: "56.25%"}}>
                    {preview ? (
                        selectedFile?.type.startsWith("video/") ? (
                            <ReactPlayer
                                url={preview}
                                playing
                                loop
                                muted
                                width="100%"
                                height="100%"
                                className="absolute top-0 left-0 w-full h-full"
                                config={{
                                    file: {
                                        attributes: {
                                            controlsList: "nodownload nofullscreen noremoteplayback"
                                        }
                                    }
                                }}
                            />
                        ) : (
                            <img
                                src={preview}
                                alt="Preview"
                                className="absolute top-0 left-0 w-full h-full object-contain rounded-lg border border-neutral-600"
                            />
                        )
                    ) : (
                        <div
                            className="flex items-center justify-center h-full bg-gray-100 rounded-lg border border-neutral-600"
                        >
                            <span className="text-gray-500">Preview aparecerá aqui.</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

