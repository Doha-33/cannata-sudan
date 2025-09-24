"use client";
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
  className: "marker-icon", // علشان نستهدفها بسهولة
});

// خليه هو الـ default
L.Marker.prototype.options.icon = customIcon;

const MapComponent = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [locations, setLocations] = useState([]);

  // locations الافتراضية
  const defaultLocations = [
    {
      lat: 25.288306,
      lng: 55.318263,
      name: {
        en: "78Q9+79C - Deira - Dubai - United Arab Emirates",
        ar: "78Q9+79C - ديرة - دبي - الإمارات العربية المتحدة",
      },
    },
    {
      lat: 25.230326,
      lng: 55.363081,
      name: {
        en: "3 7A Street - Umm Ramool - Dubai - United Arab Emirates",
        ar: "3 7A Street - أم رمول - دبي - الإمارات العربية المتحدة",
      },
    },
    {
      lat: 24.9609375,
      lng: 55.0633125,
      name: {
        en: "X367+98H - Jebel Ali - Jebel Ali Free Zone - Dubai - United Arab Emirates",
        ar: "X367+98H - جبل علي - منطقة جبل علي الحرة - دبي - الإمارات العربية المتحدة",
      },
    },
  ];

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await ApiClient.get("setting");

        if (res?.data?.locations?.length) {
          const mapped = res.data.locations.map((loc, index) => ({
            lat: parseFloat(loc.latitude),
            lng: parseFloat(loc.longitude),
            name: {
              en: loc?.name?.en || defaultLocations[index]?.name.en,
              ar: loc?.name?.ar || defaultLocations[index]?.name.ar,
            },
          }));
          setLocations(mapped);
        } else {
          setLocations(defaultLocations);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
        setLocations(defaultLocations);
      }
    };

    fetchLocations();
  }, []);

  // ✅ إضافة alt attribute تلقائيًا بعد ما الماركرز تتعمل
  useEffect(() => {
    const imgs = document.querySelectorAll(
      ".leaflet-marker-icon, .leaflet-marker-shadow"
    );
    imgs.forEach((img) => {
      if (!img.getAttribute("alt")) {
        img.setAttribute("alt", "Cannata location marker on map");
      }
    });
  }, [locations]);

  return (
    <div style={{ width: "100%" }}>
      <MapContainer
        center={[25.24, 55.36]}
        zoom={9}
        scrollWheelZoom={false}
        style={{
          margin: "10px",
          height: "450px",
          width: "80%",
          borderRadius: "10px",
          margin: "auto",
        }}
      >
        {/* ✅ English-only Carto Light tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {locations.map((loc, idx) => (
          <Marker key={idx} position={[loc.lat, loc.lng]} icon={customIcon}>
            <Popup>{isArabic ? loc.name.ar : loc.name.en}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
