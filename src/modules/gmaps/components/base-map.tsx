// components/maps/BaseMap.tsx
"use client";

import GlobalCard from "@/components/global/cards/global-card";
import { GoogleMap } from "@react-google-maps/api";
import { ReactNode } from "react";

type BaseMapProps = {
  center: google.maps.LatLngLiteral;
  zoom?: number;
  height?: string;
  children?: ReactNode;
};

export default function BaseMap({
  center,
  zoom = 12,
  height = "400px",
  children,
}: BaseMapProps) {
  return (
    <GlobalCard title="basis gmaps">
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height,
        }}
        center={center}
        zoom={zoom}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        {children}
      </GoogleMap>
    </GlobalCard>
  );
}
