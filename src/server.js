import express from "express";
import cors from "cors";
import * as db from "./config/db/initialData";
import usuarios from "./modulos/usuario/routes/index";

const app = express();

db.createInitialConfig();

app.use(express.json());
app.use(cors());
app.use(usuarios);

app.listen(8080);
