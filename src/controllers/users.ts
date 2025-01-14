import { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/auth";

export const createAccount = async (req: Request, res: Response) => {
  // se esta utilizando la importacion dinamica para importar la libreria slug debido a que en la version 10.0.0 de la libreria solamente funciona con ESModules y Como estamos usando Typescript que se encarga de compilar nuestro codigo este lo pasa a CommonJS y esto genera un error, y para solucionar este problema se utiliza la importacion dinamica para que asi cuando se compile el codigo se pueda importar la libreria slug de manera correcta
  const { default: slug } = await import("slug");
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({
      email,
    });
    // si el usuario ya existe
    if (userExists) {
      const error = new Error("User already exists");
      res.status(409).json({ error: error.message });
      return;
    }
    // importando el handle de la peticion
    const handle = slug(req.body.handle, "");
    // si ya existe el handle
    const handleExists = await User.findOne({ handle });
    if (handleExists) {
      const error = new Error("Handle already exists");
      res.status(409).json({ error: error.message });
      return;
    }

    // creando la instancia del usuario
    const newUser = new User(req.body);
    // hasheando la contraseña
    newUser.password = await hashPassword(password);
    // creando el handle
    newUser.handle = slug(handle, "");

    // guardando el usuario en la base de datos
    await newUser.save();
    // res.send("User created successfully");
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
