"use client";

import { MapContainer, TileLayer, Popup } from "react-leaflet";

import { Marker } from "@adamscybot/react-leaflet-component-marker";

import "leaflet/dist/leaflet.css";
import { Post } from "@/lib/definitions";
import PostCard from "./ui/PostCard";
import Link from "next/link";
import { divIcon, Map } from "leaflet";
import { MarkerIcon } from "./Utilities";

import L from "leaflet";
import { useEffect } from "react";

type TLocationMapProps = {
    lat: string,
    lng: string,
}
export default function LocationMap({ lat, lng }: TLocationMapProps) {
  useEffect(() => {
    const container = L.DomUtil.get("map");
    if (!container) return;
    if (container.classList.contains("leaflet-container")) return;
    const map = L.map("map", {
      center: [51.505, -0.09],
      zoom: 4,
    });
    map.invalidateSize();
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);
  }, []);

  return (
    <>
      <main>
        <MapContainer
          center={[20.105, 40]}
          zoom={5}
          scrollWheelZoom={false}
          className=""
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker
            
            position={[parseInt(lat), parseInt(lng)]}
            icon={<p className="bg-slate-200 p-2 rounded-md">{lat}</p>}
          ></Marker>
        </MapContainer>
      </main>
    </>
  );
}
