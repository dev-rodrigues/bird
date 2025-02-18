import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Switch } from '@/components/ui/switch.tsx';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { StepComponentProps } from "@/modals/CreateCampaignDialogTypes.ts";

export interface LocalizationProps {
    lat: number;
    lng: number;
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

const locations: LocalizationProps[] = [
    { lat: -22.9995, lng: -43.3615, name: 'Semáforo 1 - Avenida das Américas' },
    { lat: -22.9980, lng: -43.3630, name: 'Semáforo 2 - Avenida das Américas' },
    { lat: -22.9965, lng: -43.3645, name: 'Semáforo 3 - Avenida das Américas' },
    { lat: -22.9950, lng: -43.3660, name: 'Semáforo 4 - Avenida das Américas' },
    { lat: -22.9935, lng: -43.3675, name: 'Semáforo 5 - Avenida das Américas' },
    { lat: -22.9920, lng: -43.3690, name: 'Semáforo 6 - Avenida das Américas' },
    { lat: -22.9905, lng: -43.3705, name: 'Semáforo 7 - Avenida das Américas' },
    { lat: -22.9890, lng: -43.3720, name: 'Semáforo 8 - Avenida das Américas' },
];

const calculateCenter = (locations: LocalizationProps[]) => {
    const total = locations.reduce(
        (acc, location) => {
            return {
                lat: acc.lat + location.lat,
                lng: acc.lng + location.lng,
            };
        },
        { lat: 0, lng: 0 }
    );

    return {
        lat: total.lat / locations.length,
        lng: total.lng / locations.length,
    };
};

const center = calculateCenter(locations);

export default function CampaignLocalizationStep({ data, updateData }: StepComponentProps<"localization">) {
    const selectedLocations = data ?? [];

    const handleToggleLocation = (location: LocalizationProps, isChecked: boolean) => {
        if (isChecked) {
            updateData([...selectedLocations, location]);
        } else {
            updateData(selectedLocations.filter((loc) => loc.name !== location.name));
        }
    };

    return (
        <div>
            <MapContainer center={center} zoom={15} style={{ height: '450px', width: '100%' }}>
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
                            position={[location.lat, location.lng]}
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

            <div style={{ marginTop: '20px' }}>
                <h3>Selected Locations:</h3>
                <div style={{ maxHeight: '55px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
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