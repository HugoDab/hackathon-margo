import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import Map from "react-map-gl";
import { useEffect, useRef, useState } from "react";
import { initMap, useMap } from "./useMap";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY ?? "";

export const MapView = (): JSX.Element => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [zoom, setZoom] = useState<number>(10);
  const mapRef = useRef<HTMLDivElement>(null);
  useMap(mapRef);

  return (
    <div
      className="mapContainer"
      style={{ position: "absolute", height: "100%", width: "90%" }}
    >
      <div
        ref={mapRef}
        className="map"
        style={{ height: "70vh", width: "85vw" }}
      />
    </div>
  );
};
