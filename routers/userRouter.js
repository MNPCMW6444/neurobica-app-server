"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/loggedIn", async (req, res) => {
    try {
        console.log(req);
        res.json({ yoad: 104 });
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
});
router.post("/login", async (req, res) => {
    try {
        console.log(req);
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
});
exports.default = router;
