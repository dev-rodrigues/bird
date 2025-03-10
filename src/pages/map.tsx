import {useEffect, useState} from "react";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {CreateTotemDialog} from "@/modals/CreateTotemDialog.tsx";
import {useCampaigns} from "@/services/totemService.ts";

export interface Totem {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

const customIcon = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

export default function Map() {
    const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
    const {data: totems} = useCampaigns()
    const result = totems ?? [];

    useEffect(() => {
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

    return (
        <div className="flex flex-col gap-4 p-4 relative z-0 w-full">
            <CreateTotemDialog/>

            {userPosition ? (
                <div className={"w-full h-screen p-4"}>
                    <MapContainer center={userPosition} zoom={13} className="w-full h-[85%] rounded-lg shadow-md z-0">
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                        {result.map((totem, index) => (
                            <Marker key={index} position={[totem.latitude, totem.longitude]} icon={customIcon}>
                                <Popup>
                                    <strong>{totem.name}</strong>
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
