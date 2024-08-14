"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { Post } from "@/lib/definitions";
import PostCard from "./ui/PostCard";

type TMapProps = {
  data: Post;
};
export default function MapComponent({ data }: TMapProps) {
  const position = [
    [51.505, -0.09],
    [23.434, -0.32],
    [45.433, -3.43],
  ];

  return (
    <>
      <div className="w-full max-h-[420px] overflow-hidden">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
          className=""
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {position.map((marker: any, index) => {
            return (
              <Marker key={index} position={marker}>
                {/* <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup> */}

                <Popup>
                  <PostCard
                    image={data?.images?.[0]}
                    title={data?.title}
                    bathroom={data?.bathroom}
                    bedroom={data?.bedroom}
                    price={data?.price}
                    className="w-full"
                    unitArea={
                      data?.unitArea ? data?.unitArea.toLocaleString() : 1232
                    }
                  />
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </>
  );
}
