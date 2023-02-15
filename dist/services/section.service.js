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
const sectionModel = database_1.default.getRepository(entities_1.Section);
exports.default = {
    create(userId, courseId, sectionData) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield courseModel.findOne({ where: { userId: userId, id: courseId } });
            if (!course)
                throw boom_1.default.badRequest('course to add section not found.');
            const result = yield sectionModel.save(Object.assign({ course: course }, sectionData));
            if (!result)
                throw boom_1.default.badRequest('can not create section.');
            return result;
        });
    },
    list(userId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield courseModel.findOneBy({ id: courseId, userId: userId });
            if (!course)
                throw boom_1.default.badRequest('course to fetch sections do not exists.');
            const result = yield sectionModel.find({ where: { course: { id: courseId, userId: userId } } });
            if (!result)
                throw boom_1.default.internal('can not list sections.');
            return result;
        });
    },
    listOne(userId, sectionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield sectionModel.findOne({ where: { id: sectionId, course: { userId: userId } } });
            if (!result)
                throw boom_1.default.notFound('section not found.');
            return result;
        });
    },
    updateOne(userId, sectionId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const section = yield sectionModel.findOne({ where: { id: sectionId, course: { userId: userId } } });
            if (!section)
                throw boom_1.default.notFound('section to update not found.');
            const result = yield sectionModel.save(Object.assign(Object.assign({}, section), data));
            if (!result)
                throw boom_1.default.badRequest('can not update section.');
            return result;
        });
    },
    deleteOne(userId, sectionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const section = yield sectionModel.findOne({ where: { id: sectionId, course: { userId: userId } } });
            if (!section)
                throw boom_1.default.badRequest('section to delete not found.');
            const result = yield sectionModel.remove(section);
            return { deletedSectionId: sectionId };
        });
    },
};
