"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    serialNumber: { type: Number, required: true, unique: true },
    activated: { type: Boolean, required: true },
    deleted: { type: Boolean, required: true },
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("user", userSchema);
