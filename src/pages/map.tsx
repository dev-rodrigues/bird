import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import L from "leaflet";

interface Toten {
    lat: number;
    lng: number;
    name: string;
}

const customIcon = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

const schema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    lat: z.string().refine(val => !isNaN(parseFloat(val)), "Latitude deve ser um número"),
    lng: z.string().refine(val => !isNaN(parseFloat(val)), "Longitude deve ser um número"),
});

export default function Map() {
    const [totens, setTotens] = useState<Toten[]>([]);
    const [userPosition, setUserPosition] = useState<[number, number] | null>(null);

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        setTotens([]);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserPosition([position.coords.latitude, position.coords.longitude]);
                },
                (error) => {
                    console.error("Erro ao obter localização:", error);
                }
            );
        } else {
            console.error("Geolocalização não é suportada pelo navegador.");
        }
    }, []);

    const onSubmit = (data: { lat: string; lng: string; name: string }) => {
        const newToten: Toten = {
            lat: parseFloat(data.lat),
            lng: parseFloat(data.lng),
            name: data.name,
        };
        setTotens([...totens, newToten]);
        reset();
    };

    return (
        <div className="flex flex-col gap-4 p-4 relative z-0 w-full">
            <div className="flex items-center gap-4 w-full">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-green-500 hover:bg-green-600 text-white">
                            Criar um novo ponto de visualização
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="z-50 max-w-4xl w-full p-8">
                        <DialogHeader>
                            <DialogTitle>Criar um novo ponto de visualização</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700">Nome:</label>
                                <Input {...register("name")} placeholder="Nome" className="w-full"/>
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div>
                            <div className="flex gap-2">
                                <div className="w-1/2">
                                    <label className="block text-sm font-bold text-gray-700">Latitude</label>
                                    <Input {...register("lat")} placeholder="Latitude" className="w-full"/>
                                    {errors.lat && <p className="text-red-500 text-sm">{errors.lat.message}</p>}
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-sm font-bold text-gray-700">Longitude</label>
                                    <Input {...register("lng")} placeholder="Longitude" className="w-full"/>
                                    {errors.lng && <p className="text-red-500 text-sm">{errors.lng.message}</p>}
                                </div>
                            </div>
                            <Button type="submit" className="mt-4 w-full">Salvar Toten</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            {userPosition ? (
                <div className={"w-full h-screen p-4"}>
                    <MapContainer center={userPosition} zoom={13} className="w-full h-[90%] rounded-lg shadow-md z-0">
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                        {totens.map((toten, index) => (
                            <Marker key={index} position={[toten.lat, toten.lng]} icon={customIcon}>
                                <Popup>
                                    <strong>{toten.name}</strong>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            ) : (
                <p>Obtendo localização...</p>
            )}
        </div>
    );
}
