import express from 'express';
import { delteSlideImage, getSlideImage, getSlideImageById, saveSlideImage, updateSlideImage } from '../controllers/slideImageController.js';

const slideImageRoute = express.Router();

// Menggunakan slideImageRoute, bukan router
slideImageRoute.get("/slides", getSlideImage);
slideImageRoute.get("/slides/:id", getSlideImageById); // Tambahkan '/' sebelum :id
slideImageRoute.post("/slides", saveSlideImage);
slideImageRoute.patch("/slides/:id", updateSlideImage); // Tambahkan '/' sebelum :id
slideImageRoute.delete("/slides/:id", delteSlideImage); // Tambahkan '/' sebelum :id

export default slideImageRoute;
