import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import {Switch} from '@/components/ui/switch.tsx';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import {StepComponentProps} from "@/modals/CreateCampaignDialogTypes.ts";
import {useCampaigns} from "@/services/totemService.ts";
import {useEffect, useState} from "react";

export interface LocalizationProps {
    latitude: number;
    longitude: number;
    name: string;
}

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const SelectedIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function CampaignLocalizationStep({data, updateData}: StepComponentProps<"localization">) {
    const [userPosition, setUserPosition] = useState<[number, number] | null>(null);

    const {data: totems} = useCampaigns()
    const locations = totems ?? [];

    const selectedLocations = data ?? [];

    const handleToggleLocation = (location: LocalizationProps, isChecked: boolean) => {
        if (isChecked) {
            updateData([...selectedLocations, location]);
        } else {
            updateData(selectedLocations.filter((loc) => loc.name !== location.name));
        }
    };

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
        <div>
            {userPosition ? (

                <MapContainer center={userPosition} zoom={15} style={{height: '250px', width: '100%'}}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {locations.map((location, index) => {
                        const isSelected = selectedLocations.some(
                            (selected) => selected.name === location.name
                        );

                        return (
                            <Marker
                                key={index}
                                position={[location.latitude, location.longitude]}
                                icon={isSelected ? SelectedIcon : DefaultIcon}
                            >
                                <Popup>
                                    <div>
                                        <p>{location.name}</p>
                                        <Switch
                                            checked={isSelected}
                                            onCheckedChange={(isChecked) =>
                                                handleToggleLocation(location, isChecked)
                                            }
                                        />
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            ): (
                <p>Obtendo localização...</p>
            )}

            <div style={{marginTop: '20px'}}>
                <h3>Selected Locations:</h3>
                <div style={{maxHeight: '55px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px'}}>
                    <ul>
                        {selectedLocations.map((location, index) => (
                            <li key={index}>{location.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}