import { Router } from "express";
const router = Router();

// Autenticacion
router.post("/auth/register", (req, res) => {
  res.send("Login");
});

router.post("/auth/login", (req, res) => {
  res.send("Login");
});

export default router;
