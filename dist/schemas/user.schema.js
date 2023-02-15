"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.getUserSchema = exports.createUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.string();
const firstName = joi_1.default.string().min(3).max(30);
const lastName = joi_1.default.string().min(3).max(30);
const email = joi_1.default.string().max(100);
const phone = joi_1.default.string().max(100);
const createUserSchema = joi_1.default.object({
    id: id.required(),
    firstName: firstName.required(),
    lastName: lastName.required(),
    email: email.required(),
    phone: phone.required(),
});
exports.createUserSchema = createUserSchema;
const updateUserSchema = joi_1.default.object({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
});
exports.updateUserSchema = updateUserSchema;
const getUserSchema = joi_1.default.object({
    id: id.required()
});
exports.getUserSchema = getUserSchema;
