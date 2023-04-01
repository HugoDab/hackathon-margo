import {CodeError} from "../utils/codeError";
import status from "http-status"
import {getNearestPoint, routeToPoint} from "./utils";
import express from "express";

async function goToNeareastWater(req: express.Request, res: express.Response) {
    // #swagger.tags = ['Consumers']
    // #swagger.summary = 'Get all drinking water points in the distance provided'

    if (!req.query.hasOwnProperty('long')) throw new CodeError('You must specify the longitude', status.BAD_REQUEST);
    if (!req.query.hasOwnProperty('lat')) throw new CodeError('You must specify the latitude', status.BAD_REQUEST);
    if (!req.query.hasOwnProperty('using')) throw new CodeError('You must specify the routing profile', status.BAD_REQUEST);
    const {long, lat, using} = req.query;

    const nearestPoint = await getNearestPoint(Number(long), Number(lat), String(using));

    res.json({
        status: true,
        message: 'Returning drinking water nearest point',
        data: nearestPoint
    });
}


async function goToPoint(req: express.Request, res: express.Response) {
    // #swagger.tags = ['Consumers']
    // #swagger.summary = 'Get all drinking water points in the distance provided'

    if (!req.query.hasOwnProperty('lat1')) throw new CodeError('You must specify the latitude 1', status.BAD_REQUEST);
    if (!req.query.hasOwnProperty('lat2')) throw new CodeError('You must specify the latitude 2', status.BAD_REQUEST);
    if (!req.query.hasOwnProperty('long1')) throw new CodeError('You must specify the longitude 1', status.BAD_REQUEST);
    if (!req.query.hasOwnProperty('long2')) throw new CodeError('You must specify the longitude 2', status.BAD_REQUEST);
    if (!req.query.hasOwnProperty('using')) throw new CodeError('You must specify the routing profile', status.BAD_REQUEST);
    const {long1, long2, lat1, lat2, using} = req.query;

    const route = await routeToPoint(Number(lat1), Number(lat2),Number(long1), Number(long2),String(using));

    res.json({
        status: true,
        message: 'Returning route to the point',
        data: route
    });
}


export {goToNeareastWater, goToPoint}