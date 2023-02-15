"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLessonSchema = exports.getLessonSchema = exports.createLessonSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const title = joi_1.default.string().min(3).max(30);
const description = joi_1.default.string().max(100);
const video = joi_1.default.string().max(100);
const resources = joi_1.default.string().max(100);
const createLessonSchema = joi_1.default.object({
    title: title.required(),
});
exports.createLessonSchema = createLessonSchema;
const updateLessonSchema = joi_1.default.object({
    title: title,
});
exports.updateLessonSchema = updateLessonSchema;
const getLessonSchema = joi_1.default.object({
    id: id.required()
});
exports.getLessonSchema = getLessonSchema;
