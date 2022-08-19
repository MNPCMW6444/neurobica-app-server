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
    const { email, password, passwordagain } = req.body;
    if (!email || !password || !passwordagain)
      return res.status(400).json({
        clientError: "At least one of the fields are missing",
      });
    console.log(passwordStrength(password).value);
    if (parseInt(passwordStrength(password).value) < 2)
      return res.status(400).json({
        errorMessage:
          "Password isn't strong enough, the value is" +
          passwordStrength(password).value,
      });
  } catch (err) {
    //console.error(err);
    res
      .status(500)
      .json({ serverError: "Unexpected error occurred in the server" });
  }
});
/* 
router.post("/", async (req, res) => {
  try {
    if (password !== passwordVerify)
      return res.status(400).json({
        errorMessage: "Please enter the same twice for verification.",
      });

    // make sure no account exists for this email

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    // hash the password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save the user in the database

    const newUser = new User({
      email,
      passwordHash,
    });

    const savedUser = await newUser.save();

    // create a JWT token

    const token = jwt.sign(
      {
        id: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    res
      .cookie("token", token, {
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
    res.status(500).send();
  }
});
 */
export default router;
