import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import slideImageRoute from "./routes/slideImageRoute.js";
import profileRoute from "./routes/profileRoute.js";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(slideImageRoute);
app.use(profileRoute);


app.listen(5000, ()=> console.log('Server up and running...'));