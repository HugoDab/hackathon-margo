import {drinkingWaterArray} from "../models/database";
import {DrinkingWater} from "../utils/types";
import axios from "axios";
import dotenv from "dotenv";
import {CodeError} from "../utils/codeError";
import status from "http-status";

dotenv.config()

const earthRadius = 6371;
const apiKey = process.env.MAPBOX_API_KEY

function getAllPointsFromDist(posLong: number, posLat: number, maxDistance: number, limit?: number) {

    let reachablePoints: Array<DrinkingWater> = [];
    let numberOfPointsLeft: number = limit ?? -1; //if undefined, value is -1

    for (const drinkingWaterPoint of drinkingWaterArray) {
        const lat = drinkingWaterPoint.lat;
        const long = drinkingWaterPoint.long;

        const distance = distanceUsingLatLog(deg2rad(lat), deg2rad(posLat), deg2rad(long), deg2rad(posLong));

        if (distance < maxDistance) {
            reachablePoints.push(drinkingWaterPoint);
            if (--numberOfPointsLeft === 0) break;
        }
    }

    return reachablePoints;
}

 async function getNearestPoint(posLong: number, posLat: number, profile: string) {

    let minDuration = Number.MAX_VALUE;
    let nearestPoint = {};

    for (const drinkingWaterPoint of drinkingWaterArray) {
        const lat = drinkingWaterPoint.lat;
        const long = drinkingWaterPoint.long;

        const route = await routeToPoint(lat, posLat, long, posLong, profile);
        if (route.duration < minDuration) {
            minDuration = route.duration;
            nearestPoint = {point: drinkingWaterPoint, route: route};
        }
    }
    return nearestPoint;
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
}

function distanceUsingLatLog(lat1: number, lat2: number, long1: number, long2: number) {
    // Haversine formula
    const a = Math.pow(Math.sin((lat1 - lat2) / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin((long1 - long2) / 2), 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadius * c;
}

async function routeToPoint(lat1: number, lat2: number, long1: number, long2: number, profile: string) {
    let res;
    try {
        res = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/${profile}/${long1},${lat1};${long2},${lat2}?geometries=geojson&access_token=${apiKey}`)
    } catch (e) {
        console.error(e);
        throw new CodeError('Error getting the directions from Mapbox', status.INTERNAL_SERVER_ERROR);
    }

    return res?.data.routes[0];
}

export {getAllPointsFromDist, getNearestPoint, routeToPoint}