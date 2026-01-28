"use client";

import { ReactNode } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

type Props = {
  children: ReactNode;
  libraries?: ("places" | "drawing" | "visualization" | "geometry")[];
};

export default function GoogleMapProvider({ children, libraries = [] }: Props) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  if (!isLoaded) return <div>Loading map...</div>;

  return <>{children}</>;
}
