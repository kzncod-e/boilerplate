"use client";

import { Marker } from "@react-google-maps/api";
import GoogleMapProvider from "../components/gmaps-provider";
import BaseMap from "../components/base-map";
import PageHeader from "@/components/global/page-header";

const center = { lat: -6.2, lng: 106.8 };

export default function GmapsPage() {
  return (
    <GoogleMapProvider>
      <PageHeader title="Gmaps page" description="" />
      <BaseMap center={center}>
        <Marker position={center} />
      </BaseMap>
    </GoogleMapProvider>
  );
}
