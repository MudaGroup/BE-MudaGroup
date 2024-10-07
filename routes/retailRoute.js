import express from "express";
import { deleteRetail, getRetail, getRetailById, saveRetail, updateRetail } from "../controllers/retailController.js";

const retailRoute = express.Router();

retailRoute.get('/retail', getRetail);
retailRoute.get('/retail/:id', getRetailById);
retailRoute.post('/retail', saveRetail);
retailRoute.patch('/retail/:id', updateRetail);
retailRoute.delete('/retail/:id', deleteRetail);

export default retailRoute