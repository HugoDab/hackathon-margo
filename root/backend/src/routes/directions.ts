import express from "express";
import {methodNotAllowed} from "../utils/customErrors";
import {goToNeareastWater, goToPoint} from "../controllers/directions";

const directionsRouter: express.Router = express.Router();

directionsRouter.get("/directions/nearest", goToNeareastWater);
directionsRouter.post("/directions/nearest", methodNotAllowed);
directionsRouter.put("/directions/nearest", methodNotAllowed);
directionsRouter.delete("/directions/nearest", methodNotAllowed);

directionsRouter.get("/directions/point", goToPoint);
directionsRouter.post("/directions/point", methodNotAllowed);
directionsRouter.put("/directions/point", methodNotAllowed);
directionsRouter.delete("/directions/point", methodNotAllowed);

export {directionsRouter};