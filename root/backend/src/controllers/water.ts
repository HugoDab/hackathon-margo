import {CodeError} from "../utils/codeError";
import status from "http-status"
import {getAllPointsFromDist} from "./utils";
import express from "express";

function getDrinkingWaterPointsFromDist(req: express.Request, res: express.Response) {
    // #swagger.tags = ['Consumers']
    // #swagger.summary = 'Get all drinking water points in the distance provided'

    if (!req.query.hasOwnProperty('long')) throw new CodeError('You must specify the longitude', status.BAD_REQUEST);
    if (!req.query.hasOwnProperty('lat')) throw new CodeError('You must specify the latitude', status.BAD_REQUEST);
    if (!req.query.hasOwnProperty('dist')) throw new CodeError('You must specify the distance', status.BAD_REQUEST);
    const {long, lat, dist, limit} = req.query;

    const reachablePoints = getAllPointsFromDist(Number(long), Number(lat), Number(dist), Number(limit));

    res.json({
        status: true,
        message: 'Returning drinking water points in the distance provided',
        data: reachablePoints
    })
}

export {getDrinkingWaterPointsFromDist}