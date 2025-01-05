import { Router } from "express";
import User from "./models/User";
const router = Router();

// Autenticacion
router.post("/auth/register", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).json(newUser);
});

router.post("/auth/login", (req, res) => {
  res.send("Login");
});

export default router;
