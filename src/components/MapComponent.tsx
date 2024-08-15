"use client";

import { MapContainer, TileLayer,  Popup } from "react-leaflet";

import {Marker} from "@adamscybot/react-leaflet-component-marker";

import "leaflet/dist/leaflet.css";
import { Post } from "@/lib/definitions";
import PostCard from "./ui/PostCard";
import Link from "next/link";
import { divIcon } from "leaflet";
import { MarkerIcon } from "./Utilities";

type TMapProps = {
  data: Post[];
};
export default function MapComponent({ data }: TMapProps) {

  return (
    <>
      <div className="rounded-md w-full max-h-[420px] overflow-hidden">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={2}
          scrollWheelZoom={false}
          className=""
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {data.map((listing: Post, index) => {
            return (
              <Marker key={index} position={[parseInt(listing.latitude), parseInt(listing.longitude)]} icon={<MarkerIcon price={listing.price}/>}>
                {/* <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup> */}

                <Popup className="p-0 bg-transparent">
                  <Link href={`/home-details/${listing.id}`}>
                    <PostCard
                      image={listing?.images?.[0]}
                      title={listing?.title}
                      bathroom={listing?.bathroom}
                      bedroom={listing?.bedroom}
                      price={listing?.price}
                      className="max-w-full"
                      unitArea={
                        listing?.unitArea ? listing?.unitArea.toLocaleString() : 1232
                      }
                    />
                  </Link>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </>
  );
}
