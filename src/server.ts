import express from "express";
import router from "./router";
import { connectBD } from "./config/BD";

const app = express();

//conexion a la base de datos
connectBD();

// Middleware para parsear el body de las peticiones
app.use(express.json());

app.use("/api", router);

export default app;
