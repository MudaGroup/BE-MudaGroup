import express from "express";
import { deleteCage, getCage, getCageById, saveCage, updateCage } from "../controllers/cageController.js";

const cageRoute = express.Router();

cageRoute.get('/cage', getCage);
cageRoute.get('/cage/:id', getCageById);
cageRoute.post('/cage', saveCage);
cageRoute.patch('/cage/:id', updateCage);
cageRoute.delete('/cage/:id', deleteCage);

export default cageRoute