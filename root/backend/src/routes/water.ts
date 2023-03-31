import express from "express";
import {methodNotAllowed} from "../utils/customErrors";
import {getDrinkingWaterPointsFromDist} from "../controllers/water";

const waterRouter: express.Router = express.Router();

waterRouter.get("/drinkingWater", getDrinkingWaterPointsFromDist);
waterRouter.post("/drinkingWater", methodNotAllowed);
waterRouter.put("/drinkingWater", methodNotAllowed);
waterRouter.delete("/drinkingWater", methodNotAllowed);

export {waterRouter};