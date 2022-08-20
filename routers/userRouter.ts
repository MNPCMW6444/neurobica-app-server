import express from "express";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { passwordStrength } from "check-password-strength";

const router = express.Router();

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      res.status(400).json({ clientError: "Wrong email or password" });

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(401).json({
        errorMessage: "Wrong email or password.",
      });

    const correctPassword = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!correctPassword)
      return res.status(401).json({
        errorMessage: "Wrong email or password.",
      });

    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      process.env.JWT_SECRET as string
    );

    res
      .cookie("jwt", token, {
        httpOnly: true,
        sameSite:
          process.env.NODE_ENV === "development"
            ? "lax"
            : process.env.NODE_ENV === "production" && "none",
        secure:
          process.env.NODE_ENV === "development"
            ? false
            : process.env.NODE_ENV === "production" && true,
      })
      .send();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ serverError: "Unexpected error occurred in the server" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { email, fullname, password, passwordagain } = req.body;
    if (!email || !fullname || !password || !passwordagain)
      return res.status(400).json({
        clientError: "At least one of the fields are missing",
      });
    const passStrength = passwordStrength(password);
    if (passStrength.id < 2)
      return res.status(400).json({
        clientError:
          "Password isn't strong enough, the value is" +
          passwordStrength(password).value,
      });
    if (password !== passwordagain)
      return res.status(400).json({
        clientError: "Passwords doesn't match",
      });
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        clientError: "An account with this email already exists",
      });
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    console.log((await User.find()).length + 1);
    const savedUser = await new User({
      serialNumber: (await User.find()).length + 1,
      activated: false,
      deleted: false,
      email,
      fullname,
      passwordHash,
    }).save();
    const token = jwt.sign(
      {
        id: savedUser._id,
      },
      process.env.JWT_SECRET as string
    );
    res
      .cookie("jwt", token, {
        httpOnly: true,
        sameSite:
          process.env.NODE_ENV === "development"
            ? "lax"
            : process.env.NODE_ENV === "production" && "none",
        secure:
          process.env.NODE_ENV === "development"
            ? false
            : process.env.NODE_ENV === "production" && true,
      })
      .send();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ serverError: "Unexpected error occurred in the server" });
  }
});

export default router;
