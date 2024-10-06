import express from "express";
import { deleteProfile, getProfile, getProfileById, saveProfile, updateProfile } from "../controllers/profileController.js";

const profileRoute = express.Router();

profileRoute.get('/profile', getProfile);
profileRoute.get('/profile/:id', getProfileById);
profileRoute.post('/profile', saveProfile);
profileRoute.patch('/profile/:id', updateProfile);
profileRoute.delete('/profile/:id', deleteProfile);

export default profileRoute;