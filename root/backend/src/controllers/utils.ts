import {drinkingWaterArray} from "../models/database";
import {DrinkingWater, RoutingProfile} from "../utils/types";

const earthRadius = 6371;

function getAllPointsFromDist(posLong: number, posLat: number, maxDistance: number, limit?: number) {

    let reachablePoints: Array<DrinkingWater> = [];
    let numberOfPointsLeft: number = limit??-1; //if undefined, value is -1

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

function getNearestPoint(posLong: number, posLat: number, profile: RoutingProfile) {

    let minDistance = Number.MAX_VALUE;
    let nearestPoint = {};

    for (const drinkingWaterPoint of drinkingWaterArray) {
        const lat = drinkingWaterPoint.lat;
        const long = drinkingWaterPoint.long;

        const distance = distanceUsingRoad(lat, posLat, long, posLong, profile);
        if (distance < minDistance) {
            minDistance = distance;
            nearestPoint = drinkingWaterPoint;
        }
    }
    return nearestPoint;
}

function deg2rad(deg: number) {
    return deg * (Math.PI/180);
}

function distanceUsingLatLog(lat1: number, lat2: number, long1: number, long2: number) {
    // Haversine formula
    const a = Math.pow(Math.sin((lat1 - lat2) / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin((long1 - long2) / 2), 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadius * c;
}

function distanceUsingRoad(lat1: number, lat2: number, long1: number, long2: number, profile: RoutingProfile) {

    return 0;
}

export {getAllPointsFromDist, getNearestPoint}