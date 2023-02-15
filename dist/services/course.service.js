"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = __importDefault(require("@hapi/boom"));
const database_1 = __importDefault(require("../database"));
const entities_1 = require("../database/entities");
const courseModel = database_1.default.getRepository(entities_1.Course);
exports.default = {
    create(userId, courseData) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield courseModel.save(Object.assign(Object.assign({}, courseData), { userId: userId }));
            if (!result)
                throw boom_1.default.badRequest('can not create course.');
            return result;
        });
    },
    list(userId, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield courseModel.find({ where: Object.assign({ userId: userId }, filter) });
            if (!result)
                throw boom_1.default.internal('can not list courses.');
            return result;
        });
    },
    listOne(userId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield courseModel.findOne({ where: { userId: userId, id: courseId } });
            if (!result)
                throw boom_1.default.notFound('course not found.');
            return result;
        });
    },
    updateOne(userId, courseId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield courseModel.findOne({ where: { userId: userId, id: courseId } });
            if (!course)
                throw boom_1.default.notFound('course to update not found.');
            const result = yield courseModel.save(Object.assign(Object.assign({}, course), data));
            if (!result)
                throw boom_1.default.badRequest('can not update course.');
            return result;
        });
    },
    deleteOne(userId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield courseModel.findOne({ where: { userId: userId, id: courseId } });
            if (!course)
                throw boom_1.default.badRequest('course to delete not found.');
            const result = yield courseModel.remove(course);
            return { deletedCourseId: courseId };
        });
    },
};
