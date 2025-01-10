import { Router } from "express";
import User from "./models/User";
const router = Router();

// Autenticacion
router.post("/auth/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/auth/login", (req, res) => {
  res.send("Login");
});

export default router;
