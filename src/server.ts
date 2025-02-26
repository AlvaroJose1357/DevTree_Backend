import express from "express";
import cors from "cors";
import router from "./routes/router";
import { connectBD } from "./config/BD";
import { corsOptions } from "./config/Cors";

const app = express();

//conexion a la base de datos
connectBD();

// Middleware para parsear el body de las peticiones
app.use(express.json());
// Middleware para permitir peticiones de otros servidores
app.use(cors(corsOptions));

app.use("/api", router);

export default app;
