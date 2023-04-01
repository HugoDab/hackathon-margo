import {useEffect, useRef, useState} from "react";
import mapboxgl, {Map} from "mapbox-gl";
import {clearAllMarkers, generateNewMarker} from "@/components/Map/generateNewMarker";
import axios from "axios";

export const initMap = (
    container: HTMLDivElement,
    coords: [number, number]
) => {
    return new mapboxgl.Map({
        container,
        style: "mapbox://styles/mapbox/streets-v12",
        pitchWithRotate: false,
        center: coords,
        zoom: 12,
        accessToken: process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string,
        doubleClickZoom: false,
    });
};

export function showAllMarker(map: mapboxgl.Map, limit?: number) {
    clearAllMarkers();

    const {lat: maxLat} = map.getBounds().getNorthEast();
    const {lng: maxLong} = map.getBounds().getSouthWest();
    const dist = 0.5 * distanceUsingLatLog(deg2rad(maxLat), deg2rad(map.getCenter().lat), deg2rad(maxLong), deg2rad(map.getCenter().lng));

    axios.get(`http://localhost:8080/drinkingWater?long=${map.getCenter().lng}&lat=${map.getCenter().lat}&dist=${dist}&limit=${limit}`)
        .then((response) => response.data)
        .then((data) => {
                const drinkingWaterPointArray = data.data;
                for (const drinkingWaterPoint of drinkingWaterPointArray) {
                    let color = '#8E8E8E';
                    if (drinkingWaterPoint.offers_cold_water === 0) color = '#B0FFFF';
                    if (drinkingWaterPoint.fee === 1) color = '#71E300';
                    if (drinkingWaterPoint.fee === 0) color = '#ff0000';
                    const title = "Drinking Water Point " + drinkingWaterPoint.name
                    generateNewMarker({
                        map,
                        lat: drinkingWaterPoint.lat,
                        lng: drinkingWaterPoint.long,
                    }, title, drinkingWaterPoint.description, color, true, drinkingWaterPoint.operator, drinkingWaterPoint.accepts_bottle, drinkingWaterPoint.indoor, drinkingWaterPoint.com_nom)
                }
            }
        ).catch(error => console.error(error));
}

export const useMap = (container: React.RefObject<HTMLDivElement>) => {
    const mapInitRef = useRef<Map | null>(null);
    const [currentLat, setCurrentLat] = useState(0)
    const [currentLong, setCurrentLong] = useState(0)

    useEffect(() => {
        if (container.current) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentLat(position.coords.latitude);
                    setCurrentLong(position.coords.longitude);
                    mapInitRef.current = initMap(container.current, [
                        position.coords.longitude,
                        position.coords.latitude,
                    ]);
                    generateNewMarker({
                        map: mapInitRef.current!,
                        lng: position.coords.longitude,
                        lat: position.coords.latitude,
                    }, "You are here", "", '#0000FF', false)
                },
                (error) => {
                    console.error(error);
                }
            );
        }
    }, [])

    return {mapInitRef, currentLat, currentLong};
};

function distanceUsingLatLog(lat1: number, lat2: number, long1: number, long2: number) {
    const earthRadius = 6371;

    // Haversine formula
    const a = Math.pow(Math.sin((lat1 - lat2) / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin((long1 - long2) / 2), 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadius * c;
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
}