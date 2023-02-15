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
const course_service_1 = __importDefault(require("../services/course.service"));
const course_schema_1 = require("../schemas/course.schema");
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const router = express_1.default.Router();
router.post('/', (0, validator_handler_1.default)(course_schema_1.createCourseSchema, 'body'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const courseData = req.body;
        const newCourse = yield course_service_1.default.create(userId, courseData);
        (0, response_1.handleResponse)(res, 201, 'course created.', newCourse);
    }
    catch (error) {
        next(error);
    }
}));
router.get('/', (0, validator_handler_1.default)(course_schema_1.getCoursesFilters, 'query'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get user info from auth0 
        const userId = req.auth.payload.sub || 'auth0|1234';
        const filter = req.query;
        const courses = yield course_service_1.default.list(userId, filter);
        (0, response_1.handleResponse)(res, 200, 'courses list', { courses });
    }
    catch (error) {
        next(error);
    }
}));
router.get('/:id', (0, validator_handler_1.default)(course_schema_1.getCourseSchema, 'params'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const courseId = parseInt(req.params.id);
        const course = yield course_service_1.default.listOne(userId, courseId);
        (0, response_1.handleResponse)(res, 200, 'course', course);
    }
    catch (error) {
        next(error);
    }
}));
router.patch('/:id', (0, validator_handler_1.default)(course_schema_1.getCourseSchema, 'params'), (0, validator_handler_1.default)(course_schema_1.updateCourseSchema, 'body'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const courseId = parseInt(req.params.id);
        const data = req.body;
        const course = yield course_service_1.default.updateOne(userId, courseId, data);
        (0, response_1.handleResponse)(res, 200, 'course updated', course);
    }
    catch (error) {
        next(error);
    }
}));
router.delete('/:id', (0, validator_handler_1.default)(course_schema_1.getCourseSchema, 'params'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const courseId = parseInt(req.params.id);
        const result = yield course_service_1.default.deleteOne(userId, courseId);
        (0, response_1.handleResponse)(res, 200, 'course deleted', result);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
