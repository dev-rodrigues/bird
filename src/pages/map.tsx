import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function Map() {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    setCampaigns([]);
  }, []);

  const handleSave = () => {
    if (!lat || !lng || !name) return;

    const newCampaign = {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      name,
    };
    setCampaigns([...campaigns, newCampaign]);
    setLat("");
    setLng("");
    setName("");
  };

  return (
    <div className="flex flex-col gap-4 p-4 relative z-0 w-full">
      <h1 className="text-2xl font-bold">Campaign</h1>
      <div className="flex items-center gap-4 w-full">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600 text-white">Create a new campaign</Button>
          </DialogTrigger>
          <DialogContent className="z-50 max-w-4xl w-full p-8">
            <DialogHeader>
              <DialogTitle>Create new campaign</DialogTitle>
            </DialogHeader>

            <div className="mt-4">
              <label className="block text-sm font-bold text-gray-700">Name:</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full" />
            </div>

            <div className="flex gap-2 mt-4">
              <div className="w-1/2">
                <label className="block text-sm font-bold text-gray-700">Latitude</label>
                <Input value={lat} onChange={(e) => setLat(e.target.value)} placeholder="Latitude" className="w-full" />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-bold text-gray-700">Longitude</label>
                <Input value={lng} onChange={(e) => setLng(e.target.value)} placeholder="Longitude" className="w-full" />
              </div>
            </div>

            <Button onClick={handleSave} className="mt-4 w-full">Save Campaign</Button>
          </DialogContent>
        </Dialog>
      </div>

      <MapContainer center={[-23.55052, -46.633308]} zoom={13} className="w-full h-96 rounded-lg shadow-md z-0">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {campaigns.map((campaign, index) => (
          <Marker key={index} position={[campaign.lat, campaign.lng]} icon={customIcon}>
            <Popup>
              <strong>{campaign.name}</strong>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}