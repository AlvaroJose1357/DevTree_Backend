import { Router } from "express";
import { createAccount } from "./controllers/users";
const router = Router();

// Autenticacion
router.post("/auth/register", createAccount);

router.post("/auth/login", (req, res) => {
  res.send("Login");
});

export default router;
