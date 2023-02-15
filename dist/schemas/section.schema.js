"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSectionSchema = exports.getSectionSchema = exports.createSectionSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const programId = joi_1.default.number();
const name = joi_1.default.string().min(3).max(30);
const description = joi_1.default.string().max(100);
const coverImage = joi_1.default.string().max(100);
const widgetsOrder = joi_1.default.string().max(100);
const type = joi_1.default.string().max(100);
const createSectionSchema = joi_1.default.object({
    name: name.required(),
    description: description.required(),
});
exports.createSectionSchema = createSectionSchema;
const updateSectionSchema = joi_1.default.object({
    name: name,
    description: description,
});
exports.updateSectionSchema = updateSectionSchema;
const getSectionSchema = joi_1.default.object({
    id: id.required()
});
exports.getSectionSchema = getSectionSchema;
