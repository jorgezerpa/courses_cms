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
const resource_service_1 = __importDefault(require("../services/resource.service"));
const router = express_1.default.Router();
router.post('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const lessonId = parseInt(req.params.id);
        const resourcePath = ((_a = req.files) === null || _a === void 0 ? void 0 : _a.resource).tempFilePath;
        const resourceData = req.body;
        const result = yield resource_service_1.default.addResource(userId, lessonId, resourceData, resourcePath, ((_b = req.files) === null || _b === void 0 ? void 0 : _b.resource).mimetype.split('/')[1], req.auth.token);
        (0, response_1.handleResponse)(res, 200, 'resource uploaded', result);
    }
    catch (error) {
        next(error);
    }
}));
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const lessonId = parseInt(req.params.id);
        const result = yield resource_service_1.default.getResources(userId, lessonId, req.auth.token);
        (0, response_1.handleResponse)(res, 200, 'resources', result || {});
    }
    catch (error) {
        next(error);
    }
}));
router.patch('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const resourceId = parseInt(req.params.id);
        const resourcePath = ((_c = req.files) === null || _c === void 0 ? void 0 : _c.resource) ? ((_d = req.files) === null || _d === void 0 ? void 0 : _d.resource).tempFilePath : null;
        const resourceData = req.body;
        const result = yield resource_service_1.default.updateResource(userId, resourceId, resourceData, resourcePath, 'png', req.auth.token);
        (0, response_1.handleResponse)(res, 200, 'resource updated', result);
    }
    catch (error) {
        next(error);
    }
}));
router.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const resourceId = parseInt(req.params.id);
        const result = yield resource_service_1.default.removeResource(userId, resourceId, req.auth.token);
        (0, response_1.handleResponse)(res, 200, 'resource deleted', result);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
