import { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/auth";

export const createAccount = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({
      email,
    });
    if (userExists) {
      const error = new Error("User already exists");
      res.status(409).json({ error: error.message });
      return;
    }
    const newUser = new User(req.body);
    newUser.password = await hashPassword(password);
    await newUser.save();
    // res.send("User created successfully");
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
