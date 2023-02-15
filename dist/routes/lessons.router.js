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
const express_1 = __importDefault(require("express"));
const response_1 = require("../responses/response");
const lesson_service_1 = __importDefault(require("../services/lesson.service"));
const lesson_schema_1 = require("../schemas/lesson.schema");
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const router = express_1.default.Router();
router.post('/:id', (0, validator_handler_1.default)(lesson_schema_1.createLessonSchema, 'body'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const sectionId = parseInt(req.params.id);
        const lessonData = req.body;
        const newLesson = yield lesson_service_1.default.create(userId, sectionId, lessonData);
        (0, response_1.handleResponse)(res, 201, 'lesson created.', newLesson);
    }
    catch (error) {
        next(error);
    }
}));
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const courseId = parseInt(req.params.id);
        const lessons = yield lesson_service_1.default.list(userId, courseId);
        (0, response_1.handleResponse)(res, 200, 'section list', { lessons });
    }
    catch (error) {
        next(error);
    }
}));
router.get('/get-lesson/:id', (0, validator_handler_1.default)(lesson_schema_1.getLessonSchema, 'params'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const lessonId = parseInt(req.params.id);
        const lesson = yield lesson_service_1.default.listOne(userId, lessonId, req.auth.token);
        (0, response_1.handleResponse)(res, 200, 'lesson', lesson);
    }
    catch (error) {
        next(error);
    }
}));
router.patch('/:id', (0, validator_handler_1.default)(lesson_schema_1.getLessonSchema, 'params'), (0, validator_handler_1.default)(lesson_schema_1.updateLessonSchema, 'body'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const lessonId = parseInt(req.params.id);
        const data = req.body;
        const lesson = yield lesson_service_1.default.updateOne(userId, lessonId, data);
        (0, response_1.handleResponse)(res, 200, 'section updated', lesson);
    }
    catch (error) {
        next(error);
    }
}));
router.delete('/:id', (0, validator_handler_1.default)(lesson_schema_1.getLessonSchema, 'params'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const lessonId = parseInt(req.params.id);
        const result = yield lesson_service_1.default.deleteOne(userId, lessonId);
        (0, response_1.handleResponse)(res, 200, 'section deleted', result);
    }
    catch (error) {
        next(error);
    }
}));
//VIDEOS
router.get('/assets/getVideo/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const lessonId = parseInt(req.params.id);
        const result = yield lesson_service_1.default.getVideo(userId, lessonId, req.auth.token);
        (0, response_1.handleResponse)(res, 200, 'video url', result);
    }
    catch (error) {
        next(error);
    }
}));
router.post('/assets/addVideo/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const lessonId = parseInt(req.params.id);
        const videoPath = ((_a = req.files) === null || _a === void 0 ? void 0 : _a.video).tempFilePath;
        const result = yield lesson_service_1.default.addVideo(userId, lessonId, videoPath, 'mp4', req.auth.token);
        (0, response_1.handleResponse)(res, 200, 'video uploaded', result);
    }
    catch (error) {
        next(error);
    }
}));
router.patch('/assets/updateVideo/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const lessonId = parseInt(req.params.id);
        const videoPath = ((_b = req.files) === null || _b === void 0 ? void 0 : _b.video).tempFilePath;
        const result = yield lesson_service_1.default.updateVideo(userId, lessonId, videoPath, 'mp4', req.auth.token);
        (0, response_1.handleResponse)(res, 200, 'video updated', result);
    }
    catch (error) {
        next(error);
    }
}));
router.delete('/assets/deleteVideo/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const lessonId = parseInt(req.params.id);
        const result = yield lesson_service_1.default.removeVideo(userId, lessonId, req.auth.token);
        (0, response_1.handleResponse)(res, 200, 'video deleted', result);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
