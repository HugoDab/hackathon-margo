import { useEffect, useRef } from "react";
import { Map } from "mapbox-gl";
import mapboxgl from "mapbox-gl";
import { generateNewMarker } from "./utils";

export const initMap = (
  container: HTMLDivElement,
  coords: [number, number]
) => {
  return new mapboxgl.Map({
    container,
    style: "mapbox://styles/mapbox/streets-v12",
    pitchWithRotate: false,
    center: coords,
    zoom: 14,
    accessToken: process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string,
    doubleClickZoom: false,
  });
};

export const useMap = (container: React.RefObject<HTMLDivElement>) => {
  const mapInitRef = useRef<Map | null>(null);

  useEffect(() => {
    if (container.current) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          mapInitRef.current = initMap(container.current, [
            position.coords.longitude,
            position.coords.latitude,
          ]);
          generateNewMarker({
            map: mapInitRef.current,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, []);
};
