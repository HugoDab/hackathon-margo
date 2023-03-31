import express from "express";
import {waterRouter} from "./water";
import {directionsRouter} from "./directions";

const router = express.Router();

router.use(waterRouter);
router.use(directionsRouter);

export {router}