import express from "express";
import { deleteBuilding, getBuilding, getBuildingById, saveBuilding, updateBuilding } from "../controllers/buildingController.js";

const buildingRoute = express.Router();

buildingRoute.get('/building', getBuilding);
buildingRoute.get('/building/:id', getBuildingById);
buildingRoute.post('/building', saveBuilding);
buildingRoute.patch('/building/:id', updateBuilding);
buildingRoute.delete('/building/:id', deleteBuilding);

export default buildingRoute