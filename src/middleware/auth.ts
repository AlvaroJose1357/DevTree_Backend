import type { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/jwt";
import User, { IUser } from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;

  // si en la peticion no mandan un bearer
  if (!bearer) {
    const error = new Error("Access Unauthorized");
    res.status(401).json({ error: error.message });
    return;
  }
  // si mandan un bearer
  const [, token] = bearer.split(" "); // [Bearer, token] estamos utilizando la destructuracion de arreglos para asignarle a la variable token el segundo valor del arreglo
  if (!token) {
    const error = new Error("Access Unauthorized");
    res.status(401).json({ error: error.message });
    return;
  }
  try {
    const result = verifyJWT(token);
    // si el token no es valido
    if (!result) {
      const error = new Error("Access Unauthorized");
      res.status(401).json({ error: error.message });
      return;
    }
    // si el resultado es un objeto y tiene la propiedad id
    // if(typeof result === "object" && "id" in result){
    // if (typeof result === "object" && result.hasOwnProperty("id")) {
    if (typeof result === "object" && result.id) {
      // lo que hace el metodo select es que va a traer todos los campos que le pasemos como parametro separado por espacios (name email handle), pero si no quieres traer un campo en especifico se le pasa un - (menos) delante del campo que no quieres traer (-password)
      const user = await User.findById(result.id).select("-password");
      if (!user) {
        const error = new Error("User not found");
        res.status(404).json({ error: error.message });
        return;
      }
      // le añadimos a la peticion el usuario el user encontrado, esto gracias al global namespace de express
      req.user = user;
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error by token" });
  }
};
