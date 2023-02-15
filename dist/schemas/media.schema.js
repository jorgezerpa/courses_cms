"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterMediaSchema = exports.updateMediaSchema = exports.getMediaSchema = exports.createMediaSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const name = joi_1.default.string().min(3).max(30);
const identifier = joi_1.default.string().min(3).max(30);
const createMediaSchema = joi_1.default.object({
    name: name.required(),
    identifier: identifier.required(),
});
exports.createMediaSchema = createMediaSchema;
const updateMediaSchema = joi_1.default.object({
    name: name,
    identifier: identifier,
});
exports.updateMediaSchema = updateMediaSchema;
const getMediaSchema = joi_1.default.object({
    id: id.required()
});
exports.getMediaSchema = getMediaSchema;
const filterMediaSchema = joi_1.default.object({
    filter: joi_1.default.string().regex(/images|files|videos/m)
});
exports.filterMediaSchema = filterMediaSchema;
