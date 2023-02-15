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
const auth0_1 = require("../utils/auth/auth0");
const s3_1 = require("../utils/aws/s3");
const lessonModel = database_1.default.getRepository(entities_1.Lesson);
const sectionModel = database_1.default.getRepository(entities_1.Section);
const resourceModel = database_1.default.getRepository(entities_1.Resource);
exports.default = {
    create(userId, sectionId, lessonData) {
        return __awaiter(this, void 0, void 0, function* () {
            const section = yield sectionModel.findOne({ where: { course: { userId: userId }, id: sectionId } });
            if (!section)
                throw boom_1.default.badRequest('section to add lesson not found.');
            const result = yield lessonModel.save(Object.assign({ section: section }, lessonData));
            if (!result)
                throw boom_1.default.badRequest('can not create lesson.');
            return result;
        });
    },
    list(userId, sectionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const section = yield sectionModel.findOneBy({ id: sectionId, course: { userId: userId } });
            if (!section)
                throw boom_1.default.badRequest('section to fetch lesson does not exists.');
            const result = yield lessonModel.find({
                where: {
                    section: {
                        id: sectionId,
                        course: { userId: userId }
                    },
                },
            });
            if (!result)
                throw boom_1.default.internal('can not list lessons.');
            return result;
        });
    },
    listOne(userId, lessonId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const lesson = yield lessonModel.findOne({ where: { id: lessonId, section: { course: { userId: userId } } } });
            if (!lesson)
                throw boom_1.default.notFound('lesson not found.');
            const lessonToReturn = lesson;
            if (lesson.video) {
                const user = yield (0, auth0_1.getUserInfo)(token);
                const result = yield (0, s3_1.getFile)(user.s3VideosBucketName, lesson.video);
                lessonToReturn.videoURL = result.url;
            }
            return lessonToReturn;
        });
    },
    updateOne(userId, lessonId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const lesson = yield lessonModel.findOne({ where: { id: lessonId, section: { course: { userId: userId } } } });
            if (!lesson)
                throw boom_1.default.notFound('lesson to update not found.');
            const result = yield lessonModel.save(Object.assign(Object.assign({}, lesson), data));
            if (!result)
                throw boom_1.default.badRequest('can not update lesson.');
            return result;
        });
    },
    deleteOne(userId, lessonId) {
        return __awaiter(this, void 0, void 0, function* () {
            const lesson = yield lessonModel.findOne({ where: { id: lessonId, section: { course: { userId: userId } } } });
            if (!lesson)
                throw boom_1.default.badRequest('lesson to delete not found.');
            const result = yield lessonModel.remove(lesson);
            return { deletedSectionId: lessonId };
        });
    },
    //VIDEOS
    getVideo(userId, lessonId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const lesson = yield lessonModel.findOne({ where: { id: lessonId, section: { course: { userId: userId } } } });
            if (!lesson)
                throw boom_1.default.notFound('lesson not found.');
            if (!lesson.video)
                throw boom_1.default.notFound('this lesson do not have a video.');
            const user = yield (0, auth0_1.getUserInfo)(token);
            const result = yield (0, s3_1.getFile)(user.s3VideosBucketName, lesson.video);
            return { video: lesson };
        });
    },
    addVideo(userId, lessonId, videoPath, extension, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const lesson = yield lessonModel.findOne({ where: { id: lessonId, section: { course: { userId: userId } } } });
            if (!lesson)
                throw boom_1.default.notFound('lesson to add video not found.');
            const user = yield (0, auth0_1.getUserInfo)(token);
            const s3result = yield (0, s3_1.uploadFile)(user.s3VideosBucketName, videoPath, extension);
            lesson.video = s3result.key;
            lessonModel.save(lesson);
            return { lesson: lesson };
        });
    },
    updateVideo(userId, lessonId, videoPath, extension, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield (0, auth0_1.getUserInfo)(token);
            const lesson = yield lessonModel.findOne({ where: { id: lessonId, section: { course: { userId: userId } } } });
            if (!lesson)
                throw boom_1.default.notFound('lesson not found.');
            if (lesson.video) { // delete from s3 and field
                const s3result = yield (0, s3_1.deleteFile)(user.s3VideosBucketName, lesson.video);
            }
            const s3result = yield (0, s3_1.uploadFile)(user.s3VideosBucketName, videoPath, extension);
            lesson.video = s3result.key;
            lessonModel.save(lesson);
            return { lesson: lesson };
        });
    },
    removeVideo(userId, lessonId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const lesson = yield lessonModel.findOne({ where: { id: lessonId, section: { course: { userId: userId } } } });
            if (!lesson)
                throw boom_1.default.notFound('lesson to delete video not found.');
            if (!lesson.video)
                throw boom_1.default.notFound('this lesson do not have a video to delete.');
            const user = yield (0, auth0_1.getUserInfo)(token);
            const s3result = yield (0, s3_1.deleteFile)(user.s3VideosBucketName, lesson.video);
            lesson.video = null;
            lessonModel.save(lesson);
            return { lesson: lesson };
        });
    },
};
