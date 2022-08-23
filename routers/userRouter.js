"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const check_password_strength_1 = require("check-password-strength");
const mail_1 = __importDefault(require("@sendgrid/mail"));
const router = express_1.default.Router();
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            res.status(400).json({ clientError: "Wrong email or password" });
        const existingUser = await userModel_1.default.findOne({ email });
        if (!existingUser)
            return res.status(401).json({
                clientError: "Wrong email or password",
            });
        const correctPassword = await bcryptjs_1.default.compare(password, existingUser.passwordHash);
        if (!correctPassword)
            return res.status(401).json({
                clientError: "Wrong email or password",
            });
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id,
        }, process.env.JWT_SECRET);
        res
            .cookie("jwt", token, {
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
    catch (err) {
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
        const passStrength = (0, check_password_strength_1.passwordStrength)(password);
        if (passStrength.id < 2)
            return res.status(400).json({
                clientError: "Password isn't strong enough, the value is" +
                    (0, check_password_strength_1.passwordStrength)(password).value,
            });
        if (password !== passwordagain)
            return res.status(400).json({
                clientError: "Passwords doesn't match",
            });
        const existingUser = await userModel_1.default.findOne({ email });
        if (existingUser)
            return res.status(400).json({
                clientError: "An account with this email already exists",
            });
        const salt = await bcryptjs_1.default.genSalt();
        const passwordHash = await bcryptjs_1.default.hash(password, salt);
        console.log((await userModel_1.default.find()).length + 1);
        const savedUser = await new userModel_1.default({
            serialNumber: (await userModel_1.default.find()).length + 1,
            activated: false,
            deleted: false,
            email,
            fullname,
            passwordHash,
        }).save();
        const token = jsonwebtoken_1.default.sign({
            id: savedUser._id,
        }, process.env.JWT_SECRET);
        res
            .cookie("jwt", token, {
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
    catch (err) {
        console.error(err);
        res
            .status(500)
            .json({ serverError: "Unexpected error occurred in the server" });
    }
});
router.post("/activate", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({
                clientError: "At least one of the fields are missing",
            });
        const key = mail_1.default.setApiKey("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" // Very-Sensitive
        );
        const msg = {
            to: "founders@neurobica.online",
            from: "service@neurobica.online",
            subject: "Please Activate your Neurobica account",
            html: "<h1>The Key:</h1><p>" + key + "</p>",
        };
        mail_1.default
            .send(msg)
            .then(() => {
            console.log("Verification email sent");
        })
            .catch((error) => {
            console.error(error);
        });
    }
    catch (err) {
        console.error(err);
        res
            .status(500)
            .json({ serverError: "Unexpected error occurred in the server" });
    }
});
router.get("signedin", async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token)
            return res.status(401).json({ clientMessage: "Unauthorized" });
        const validatedUser = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const userId = validatedUser.id;
        res.json(await userModel_1.default.findById(userId));
    }
    catch (err) {
        return res.status(401).json({ errorMessage: "Unauthorized." });
    }
});
exports.default = router;
