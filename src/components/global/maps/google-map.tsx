import { useLoadScript, GoogleMap as GoogleMapComponent, OverlayView } from "@react-google-maps/api";
import { useMemo } from "react";
import { LocationNewsTypes } from "@/interfaces/national-news-trends";
import Spinner from "@/components/global/loaders/spinner-animation-loader";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { mockLocations } from "@/mock/googlemap-data";

interface GoogleMapProps {
  locations?: LocationNewsTypes;
}

// Define Indonesia bounds
const INDONESIA_BOUNDS = {
  north: 6,
  south: -11,
  west: 95,
  east: 141,
};

const mapOptions = {
  restriction: {
    latLngBounds: INDONESIA_BOUNDS,
    strictBounds: false,
  },
  disableDefaultUI: true,
  mapTypeId: "roadmap",
  minZoom: 4,
  maxZoom: 10,
  styles: [
    {
      featureType: "administrative.land_parcel",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "administrative.neighborhood",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [{ color: "#BAE6FD" }], // Lighter blue
    },
    {
      featureType: "landscape",
      elementType: "geometry.fill",
      stylers: [{ color: "#FFFFFF" }], // Pure white for land
    },
  ],
};

const CustomMarker = ({ location }: { location: any }) => {
  // Calculate marker size based on news count
  const getMarkerSize = (count: number) => {
    if (count > 100) return "size-6";
    if (count > 50) return "size-5";
    return "size-4";
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="relative group">
            {/* Outer glow effect */}
            <div className="absolute -inset-2 bg-yellow-300 rounded-full opacity-40 blur-md group-hover:opacity-60 transition-opacity" />
            {/* Main marker circle */}
            <div
              className={`relative ${getMarkerSize(
                location.newsCount
              )} rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 border-2 border-white shadow-lg transform group-hover:scale-110 transition-transform`}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="max-w-[200px] bg-white/95 backdrop-blur-sm text-primary shadow-lg shadow-primary/10"
        >
          <div className="space-y-1.5 p-1">
            <p className="font-semibold text-sm">{location.name_globaleye}</p>
            <p className="text-xs text-muted-foreground">{location.name_id}</p>
            <div className="flex items-center gap-1.5">
              <div className="size-2 rounded-full bg-yellow-500" />
              <p className="text-xs font-medium">
                {location.newsCount} berita terkait
              </p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const GoogleMap = ({ locations }: GoogleMapProps) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GMAPS_API_KEY!,
    language: "id",
  });

  const center = useMemo(
    () => ({ lat: -2.5489, lng: 118.0149 }), // Center of Indonesia
    []
  );

  // Handle loading errors
  if (loadError) {
    const isMissingApiKey = !process.env.GMAPS_API_KEY;
    
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Google Maps Error
            </h3>
            <p className="text-gray-600 mb-4">
              {isMissingApiKey 
                ? "Google Maps API key is missing. Please add GMAPS_API_KEY to your environment variables."
                : "Failed to load Google Maps. Please check your internet connection and API key configuration."
              }
            </p>
            {isMissingApiKey && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                <p className="text-blue-800 font-medium mb-1">How to fix:</p>
                <ol className="text-blue-700 text-left space-y-1">
                  <li>1. Get a Google Maps API key from Google Cloud Console</li>
                  <li>2. Add it to your .env.local file:</li>
                  <li><code className="bg-blue-100 px-2 py-1 rounded">GMAPS_API_KEY=your_api_key_here</code></li>
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return <Spinner />;
  }

  // Use external mock dataset when locations are not provided
  const dataSource =
    locations && locations.data?.length
      ? locations
      : (mockLocations as LocationNewsTypes);

  return (
    <GoogleMapComponent
      zoom={5}
      center={center}
      mapContainerClassName="w-full h-full"
      options={mapOptions}
    >
      {dataSource?.data?.map((location) => {
        // Only show locations with news count > 0
        if (location.geometry?.location && location.newsCount > 0) {
          return (
            <OverlayView
              key={location.id}
              position={location.geometry.location}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <CustomMarker location={location} />
            </OverlayView>
          );
        }
        return null;
      })}
    </GoogleMapComponent>
  );
};

export default GoogleMap;
