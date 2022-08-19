"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password)
            res.status(400).json({ clientError: "Wrong email or password" });
    }
    catch (err) {
        console.error(err);
        res
            .status(500)
            .json({ serverError: "Unexpected error occurred in the server" });
        const existingUser = await userModel_1.default.findOne({ email });
        if (!existingUser)
            return res.status(401).json({
                errorMessage: "Wrong email or password.",
            });
        const correctPassword = await bcryptjs_1.default.compare(password, existingUser.passwordHash);
        if (!correctPassword)
            return res.status(401).json({
                errorMessage: "Wrong email or password.",
            });
        // create a JWT token
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id,
        }, process.env.JWT_SECRET);
        res
            .cookie("token", token, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "development"
                ? "lax"
                : process.env.NODE_ENV === "production" && "none",
            secure: process.env.NODE_ENV === "development"
                ? false
                : process.env.NODE_ENV === "production" && true,
        })
            .send();
    }
});
router.post("/signup", async (req, res) => {
    try {
        console.log(req);
    }
    catch (err) {
        console.error(err);
        res
            .status(500)
            .json({ serverError: "Unexpected error occurred in the server" });
    }
});
exports.default = router;
