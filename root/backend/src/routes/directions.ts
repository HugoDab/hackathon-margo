import express from "express";
import {methodNotAllowed} from "../utils/customErrors";
import {goToNeareastWater} from "../controllers/directions";

const directionsRouter: express.Router = express.Router();

directionsRouter.get("/directions/nearest", goToNeareastWater);
directionsRouter.post("/directions/nearest", methodNotAllowed);
directionsRouter.put("/directions/nearest", methodNotAllowed);
directionsRouter.delete("/directions/nearest", methodNotAllowed);

export {directionsRouter};