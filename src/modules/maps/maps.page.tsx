"use client";

import PageHeader from "@/components/global/page-header";
import GoogleMap from "@/components/global/maps/google-map";
import GlobalCard from "@/components/global/cards/global-card";
import { CardContent } from "@/components/ui/card";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("@/components/global/maps/leaflet-map"), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center">Loading map...</div>
});

export default function GMaps() {
  return (
    <>
        <PageHeader
            title="Google Maps"
            description="Example of Google Maps and Leaflet Maps"
        /> 
        <div className="space-y-6">
            <GlobalCard title="Google Maps">
                <CardContent className="h-96 p-0">
                    <GoogleMap />
                </CardContent>
            </GlobalCard>

            <GlobalCard title="Leaflet Maps">
                <CardContent className="h-96 p-0">
                    <LeafletMap />
                </CardContent>
            </GlobalCard>
        </div>
    </>
  );
}
