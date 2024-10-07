import express from "express";
import { deleteWorshipPlace, getWorshipPlace, getWorshipPlaceById, saveWorshipPlace, updateWorshipPlace } from "../controllers/worshipPlaceController.js";

const worshipPlaceRoute = express.Router();

worshipPlaceRoute.get('/worshipPlace', getWorshipPlace);
worshipPlaceRoute.get('/worshipPlace/:id', getWorshipPlaceById);
worshipPlaceRoute.post('/worshipPlace', saveWorshipPlace);
worshipPlaceRoute.patch('/worshipPlace/:id', updateWorshipPlace);
worshipPlaceRoute.delete('/worshipPlace/:id', deleteWorshipPlace);

export default worshipPlaceRoute