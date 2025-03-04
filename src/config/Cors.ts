import { CorsOptions } from "cors";
import { FRONTEND_URL } from "./Process";

// cors para permitir peticiones de otros servidores
export const corsOptions: CorsOptions = {
  // origin: "*", // permitir desde cualquier origen
  // origin: "http://localhost:3000", // permitir solo desde el front
  // origin: ["http://localhost:3000", "http://localhost:8080"], // permitir desde varios origenes
  origin: function (origin, callback) {
    // permitir desde varios origenes, origin es el origen de la peticion, y callback es una funcion que se ejecuta para validar si se acepta o no la peticion
    // si desearamos realizar las peticiones desde postman, thunder client, insomnia, etc, se debera de hacer una lista de los origenes permitidos llamada whitelist y se debera de validar si el origen de la peticion esta en la lista de los origenes permitidos
    const whitelist = [FRONTEND_URL];
    if (process.argv[2] === "--api") {
      whitelist.push(undefined);
    }
    if (whitelist.includes(origin)) {
      // callback recibe 2 parametros, el primero es un error, si no hay error se pasa null, y el segundo es un booleano que indica si se acepta o no la peticion
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"), false);
    }
  },
};
