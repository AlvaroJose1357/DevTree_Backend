import express from "express";
import router from "./router";

const app = express();

// Middleware para parsear el body de las peticiones
app.use(express.json());

app.use("/api", router);

export default app;
