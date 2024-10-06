import express from "express";
import { deleteVision, getVision, getVisionById, saveVision, updateVision } from "../controllers/visionController.js";


const visionRoute = express.Router();

visionRoute.get('/vision', getVision)
visionRoute.get('/vision/:id', getVisionById)
visionRoute.post('/vision', saveVision)
visionRoute.patch('/vision/:id', updateVision)
visionRoute.delete('/vision/:id', deleteVision)

export default visionRoute;