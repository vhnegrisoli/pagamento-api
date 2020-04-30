import express from 'express';
import cors from 'cors';

import usuarios from './modulos/usuario/routes/index';

const app = express();

app.use(express.json());
app.use(cors());
app.use(usuarios);

app.listen(8080);
