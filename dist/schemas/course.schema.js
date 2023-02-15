"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoursesFilters = exports.updateCourseSchema = exports.getCourseSchema = exports.createCourseSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const name = joi_1.default.string().min(3).max(30);
const description = joi_1.default.string().max(100);
const createCourseSchema = joi_1.default.object({
    name: name.required(),
    description: description.required(),
});
exports.createCourseSchema = createCourseSchema;
const updateCourseSchema = joi_1.default.object({
    name: name,
    description: description,
});
exports.updateCourseSchema = updateCourseSchema;
const getCourseSchema = joi_1.default.object({
    id: id.required()
});
exports.getCourseSchema = getCourseSchema;
//still not implemented, just "mock" filter schema
const getCoursesFilters = joi_1.default.object({
    name: name,
    description: description,
});
exports.getCoursesFilters = getCoursesFilters;
