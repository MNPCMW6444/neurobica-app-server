import express from "express";
import User from "../models/userModel";

const router = express.Router();

router.post("/loggedIn", async (req, res) => {
  try {
    console.log(req);
    res.json({yoad:104});
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log(req);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

export default router;
