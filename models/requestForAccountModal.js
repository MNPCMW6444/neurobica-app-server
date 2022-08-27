"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const requestForAccountModal = new mongoose_1.default.Schema({
    serialNumber: { type: Number, required: true, unique: true },
    email: {
        type: String,
        required: true,
    },
    key: {
        type: Number,
        required: true,
    },
});
exports.default = mongoose_1.default.model("requestForAccount", requestForAccountModal);
