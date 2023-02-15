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
const section_service_1 = __importDefault(require("../services/section.service"));
const section_schema_1 = require("../schemas/section.schema");
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const router = express_1.default.Router();
router.post('/:id', (0, validator_handler_1.default)(section_schema_1.createSectionSchema, 'body'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const courseId = parseInt(req.params.id);
        const sectionData = req.body;
        const newSection = yield section_service_1.default.create(userId, courseId, sectionData);
        (0, response_1.handleResponse)(res, 201, 'section created.', newSection);
    }
    catch (error) {
        next(error);
    }
}));
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const courseId = parseInt(req.params.id);
        const sections = yield section_service_1.default.list(userId, courseId);
        (0, response_1.handleResponse)(res, 200, 'courses list', { sections });
    }
    catch (error) {
        next(error);
    }
}));
router.get('/get-section/:id', (0, validator_handler_1.default)(section_schema_1.getSectionSchema, 'params'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const sectionId = parseInt(req.params.id);
        const section = yield section_service_1.default.listOne(userId, sectionId);
        (0, response_1.handleResponse)(res, 200, 'section', section);
    }
    catch (error) {
        next(error);
    }
}));
router.patch('/:id', (0, validator_handler_1.default)(section_schema_1.getSectionSchema, 'params'), (0, validator_handler_1.default)(section_schema_1.updateSectionSchema, 'body'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const sectionId = parseInt(req.params.id);
        const data = req.body;
        const section = yield section_service_1.default.updateOne(userId, sectionId, data);
        (0, response_1.handleResponse)(res, 200, 'section updated', section);
    }
    catch (error) {
        next(error);
    }
}));
router.delete('/:id', (0, validator_handler_1.default)(section_schema_1.getSectionSchema, 'params'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const sectionId = parseInt(req.params.id);
        const result = yield section_service_1.default.deleteOne(userId, sectionId);
        (0, response_1.handleResponse)(res, 200, 'section deleted', result);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
