import express from "express";
import { deleteMission, getMission, getMissionById, saveMission, updateMission } from "../controllers/missionController.js";


const missionRoute = express.Router();

missionRoute.get('/mission', getMission)
missionRoute.get('/mission/:id', getMissionById)
missionRoute.post('/mission', saveMission)
missionRoute.patch('/mission/:id', updateMission)
missionRoute.delete('/mission/:id', deleteMission)

export default missionRoute;