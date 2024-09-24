import express from "express";
import { shouldBeAdmin, shouldBeLoggedIn } from "../controllers/test.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/should-be-logged-in", verifyToken, shouldBeLoggedIn);
router.get("/should-be-admin", shouldBeAdmin);

// router.post("/test", (req, res) => res.send('it works'));
// router.put("/test", (req, res) => res.send('it works'));
// router.delete("/test", (req, res) => res.send('it works'));

export default router