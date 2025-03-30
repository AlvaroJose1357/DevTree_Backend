import { Request, Response } from "express";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";
import slugify from "slugify";

export const createAccount = async (req: Request, res: Response) => {
  // se esta utilizando la importacion dinamica para importar la libreria slug debido a que en la version 10.0.0 de la libreria solamente funciona con ESModules y Como estamos usando Typescript que se encarga de compilar nuestro codigo este lo pasa a CommonJS y esto genera un error, y para solucionar este problema se utiliza la importacion dinamica para que asi cuando se compile el codigo se pueda importar la libreria slug de manera correcta
  // const { default: slug } = await import("slug");
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({
      email,
    });
    // si el usuario ya existe
    if (userExists) {
      const error = new Error("Usuario ya existente");
      res.status(409).json({ error: error.message });
      return;
    }
    // importando el handle de la peticion
    const handle = slugify(req.body.handle, "");
    // si ya existe el handle
    const handleExists = await User.findOne({ handle });
    if (handleExists) {
      const error = new Error(" Handle ya existente");
      res.status(409).json({ error: error.message });
      return;
    }

    // creando la instancia del usuario
    const newUser = new User(req.body);
    // hasheando la contraseña
    newUser.password = await hashPassword(password);
    // creando el handle
    newUser.handle = slugify(handle, "");

    // guardando el usuario en la base de datos
    await newUser.save();
    // res.send("User created successfully");
    // res.status(201).json(newUser);
    res.status(201).send("Usuario creado correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (!userExist) {
      const error = new Error("Usuario no encontrado");
      res.status(404).json({ error: error.message });
      return;
    }
    // validar la contraseña, si la contraseña no es correcta devolver un error
    const isValidPassword = await checkPassword(password, userExist.password);
    if (!isValidPassword) {
      const error = new Error("Contraseña incorrecta");
      res.status(401).json({ error: error.message });
      return;
    }
    // JWT
    const token = generateJWT({ id: userExist._id });
    // res.status(200).send("Usuario logueado correctamente");
    res.status(200).send(token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  res.status(200).json(req.user);
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { description } = req.body;
    // const { default: slug } = await import("slug");
    // importando el handle de la peticion
    const handle = slugify(req.body.handle, "");
    // si ya existe el handle
    const handleExists = await User.findOne({ handle });
    if (handleExists && handleExists.email !== req.user.email) {
      const error = new Error(" Handle ya existente");
      res.status(409).json({ error: error.message });
      return;
    }
    // actualizando el usuario, como se lo pasamos al request por medio de la verificacion del middleware de authMiddleware, podemos acceder a el
    req.user.handle = handle;
    req.user.description = description;
    // guardando el usuario en la base de datos
    await req.user.save();
    res.status(200).send("Usuario actualizado correctamente");
  } catch (e) {
    console.error(e);
    const error = new Error("Hubo un error al actualizar el perfil");
    res.status(500).json({ error: error.message });
    return;
  }
};
