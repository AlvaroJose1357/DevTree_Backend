import { Request, Response } from "express";
import User from "../models/User";

export const createAccount = async (req: Request, res: Response) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    // res.send("User created successfully");
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
