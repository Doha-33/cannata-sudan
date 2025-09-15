import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ApiClient from "@/Services/APIs";
import { useTranslation } from "react-i18next";
export const dynamic = "force-dynamic";
export const revalidate = 0;
const customIcon = new L.Icon({
  iconUrl: "/leaflet/marker-icon.png",
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  shadowUrl: "/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = customIcon; // ⬅️ خليه هو الـ default

const MapComponent = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const res = await ApiClient.get("setting");
      if (res?.data?.locations) {
        const locs = res.data.locations.map((loc) => ({
          position: [parseFloat(loc.latitude), parseFloat(loc.longitude)],
          name: loc.name,
        }));
        console.log("maping");

        setLocations(locs);
      }
    };
    fetchLocations();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <MapContainer
        center={[25.24, 55.36]}
        zoom={13}
        scrollWheelZoom={false}
        style={{
          margin: "10px",
          height: "450px",
          width: "80%",
          borderRadius: "10px",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((loc, idx) => (
          <Marker key={idx} position={loc.position} icon={customIcon}>
            <Popup>{isArabic ? loc.name.ar : loc.name.en}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
