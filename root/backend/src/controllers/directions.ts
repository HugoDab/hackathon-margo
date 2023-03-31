import {CodeError} from "../utils/codeError";
import status from "http-status"
import {getNearestPoint} from "./utils";
import express from "express";
import {RoutingProfile} from "../utils/types";

function goToNeareastWater(req: express.Request, res: express.Response) {
    // #swagger.tags = ['Consumers']
    // #swagger.summary = 'Get all drinking water points in the distance provided'

    if (!req.query.hasOwnProperty('long')) throw new CodeError('You must specify the longitude', status.BAD_REQUEST);
    if (!req.query.hasOwnProperty('lat')) throw new CodeError('You must specify the latitude', status.BAD_REQUEST);
    if (!req.query.hasOwnProperty('using')) throw new CodeError('You must specify the latitude', status.BAD_REQUEST);
    const {long, lat, using} = req.query;

    const routingProfile = RoutingProfile[String(using)];

    const nearestPoint = getNearestPoint(Number(long), Number(lat), routingProfile);

    res.json({
        status: true,
        message: 'Returning drinking water points in the distance provided',
        data: nearestPoint
    });
}

export {goToNeareastWater}