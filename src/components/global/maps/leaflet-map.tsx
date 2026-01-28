"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LocationNewsTypes } from "@/interfaces/national-news-trends";
import { mockLocations } from "@/mock/googlemap-data";
import { Icon } from "leaflet";
import { useEffect } from "react";

interface LeafletMapProps {
  locations?: LocationNewsTypes;
}

const CustomMarker = ({ location }: { location: any }) => {
  const getMarkerSize = (count: number) => {
    if (count > 100) return 40;
    if (count > 50) return 35;
    return 30;
  };

  const markerSize = getMarkerSize(location.newsCount);

  const customIcon = new Icon({
    iconUrl: "data:image/svg+xml;base64," + btoa(`
      <svg width="${markerSize}" height="${markerSize}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="yellow-gradient">
            <stop offset="0%" style="stop-color:#facc15;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#eab308;stop-opacity:1" />
          </radialGradient>
        </defs>
        <circle cx="20" cy="20" r="${markerSize/2 - 2}" fill="url(#yellow-gradient)" stroke="white" stroke-width="2"/>
        <circle cx="20" cy="20" r="${markerSize/2 + 4}" fill="#fde047" opacity="0.3"/>
      </svg>
    `),
    iconSize: [markerSize, markerSize],
    iconAnchor: [markerSize / 2, markerSize / 2],
    popupAnchor: [0, -markerSize / 2],
  });

  return (
    <Marker
      position={[location.geometry.location.lat, location.geometry.location.lng]}
      icon={customIcon}
    >
      <Popup>
        <div className="space-y-1.5 p-1 min-w-[200px]">
          <p className="font-semibold text-sm">{location.name_globaleye}</p>
          <p className="text-xs text-gray-600">{location.name_id}</p>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <p className="text-xs font-medium">
              {location.newsCount} berita terkait
            </p>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

const LeafletMap = ({ locations }: LeafletMapProps) => {
  useEffect(() => {
    // Fix for default marker icon in react-leaflet
    delete (Icon.Default.prototype as any)._getIconUrl;
    Icon.Default.mergeOptions({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
    
    // If you have a Leaflet API key for additional services, you can use it here
    // For example: console.log('Leaflet API Key:', process.env.LEAFLET_API_KEY);
  }, []);

  // Use external mock dataset when locations are not provided
  const dataSource =
    locations && locations.data?.length
      ? locations
      : (mockLocations as LocationNewsTypes);

  // Center of Indonesia
  const center: [number, number] = [-2.5489, 118.0149];

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css"
      />
      <MapContainer
        center={center}
        zoom={5}
        className="w-full h-full"
        style={{ height: "100%", width: "100%" }}
      >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {dataSource?.data?.map((location) => {
        // Only show locations with news count > 0
        if (location.geometry?.location && location.newsCount > 0) {
          return (
            <CustomMarker
              key={location.id}
              location={location}
            />
          );
        }
        return null;
      })}
    </MapContainer>
    </>
  );
};

export default LeafletMap;