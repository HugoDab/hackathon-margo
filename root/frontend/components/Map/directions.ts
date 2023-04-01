import {GeoJSONSource, Map} from 'mapbox-gl';
import axios from "axios";
import {getLngLatMarkerSelected} from "@/components/Map/generateNewMarker";
import {Geometry} from "geojson";

export function drawDirections(map: Map, geometry: Geometry) {

    try {
        map.removeLayer("route");
        map.removeSource("route");
    } catch (e) {
        console.info(e)
    }

    map.addSource("route", {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': geometry
        }
    });
    map.addLayer({
        "id": "route",
        "type": "line",
        "source": "route",
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "lightgreen",
            "line-width": 8
        }
    });
}

export function removeDirections(map: Map) {
    map.removeLayer("route");
    map.removeSource("route");
}

export async function getDirectionToSelected(currentLat: number, currentLong: number, routingProfile: string) {

    const targetLngLat = getLngLatMarkerSelected();

    const route = await axios.get(`http://localhost:8080/directions/point?long1=${currentLong}&long2=${targetLngLat?.lng}&lat1=${currentLat}&lat2=${targetLngLat?.lat}&using=${routingProfile}`)
        .catch(error => console.error(error));

    return route?.data.data;
}