import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import slideImageRoute from "./routes/slideImageRoute.js";
import profileRoute from "./routes/profileRoute.js";
import visionRoute from "./routes/visionRoute.js";
import missionRoute from "./routes/missionRoute.js";
import cageRoute from "./routes/cageRoute.js";
import worshipPlaceRoute from "./routes/worshipPlaceRoute.js";
import buildingRoute from "./routes/buildingRoute.js";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(slideImageRoute);
app.use(profileRoute);
app.use(visionRoute);
app.use(missionRoute);
app.use(cageRoute);
app.use(worshipPlaceRoute);
app.use(buildingRoute);


app.listen(5000, ()=> console.log('Server up and running...'));