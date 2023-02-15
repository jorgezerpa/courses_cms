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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
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
    addResource(userId, lessonId, resourceData, resourcePath, extension, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const lesson = yield lessonModel.findOne({ where: { id: lessonId, section: { course: { userId: userId } } } });
            if (!lesson)
                throw boom_1.default.notFound('lesson to add resource not found.');
            const user = yield (0, auth0_1.getUserInfo)(token);
            const s3result = yield (0, s3_1.uploadFile)(user.s3ResourcesBucketName, resourcePath, extension);
            //add resource data -> { label:String, tag:string }
            const newResource = resourceModel.save(Object.assign({ lesson: lesson, key: s3result.key }, resourceData));
            return newResource;
        });
    },
    getResources(userId, lessonId, token) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const lesson = yield lessonModel.findOne({ where: { id: lessonId, section: { course: { userId: userId } } }, relations: { resources: true } });
            if (!lesson)
                throw boom_1.default.notFound('lesson not found.');
            if (!lesson.resources)
                throw boom_1.default.notFound('lesson not have resources.');
            const resources = [];
            const user = yield (0, auth0_1.getUserInfo)(token);
            try {
                for (var _b = __asyncValues(lesson.resources), _c; _c = yield _b.next(), !_c.done;) {
                    const resource = _c.value;
                    const resourceURL = yield (0, s3_1.getFile)(user.s3ResourcesBucketName, resource.key);
                    resources.push(Object.assign(Object.assign({}, resource), { url: resourceURL.url }));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return { resources: resources };
        });
    },
    updateResource(userId, resourceId, resourceData, resourcePath, extension, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = yield resourceModel.findOne({ where: { id: resourceId, lesson: { section: { course: { userId: userId } } } } });
            if (!resource)
                throw boom_1.default.notFound('lesson to add resource not found.');
            if (resourcePath) {
                const user = yield (0, auth0_1.getUserInfo)(token);
                const addToS3Result = yield (0, s3_1.uploadFile)(user.s3ResourcesBucketName, resourcePath, extension);
                yield (0, s3_1.deleteFile)(user.s3ResourcesBucketName, resource.key);
                resource.key = addToS3Result.key;
            }
            const result = resourceModel.save(Object.assign(Object.assign({}, resource), resourceData));
            return result;
        });
    },
    removeResource(userId, resourceId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = yield resourceModel.findOne({ where: { id: resourceId, lesson: { section: { course: { userId: userId } } } } });
            if (!resource)
                throw boom_1.default.notFound('resource to delete not found.');
            if (!resource.key)
                throw boom_1.default.notFound('this resource do not have any asset.');
            const user = yield (0, auth0_1.getUserInfo)(token);
            const s3result = yield (0, s3_1.deleteFile)(user.s3ResourcesBucketName, resource.key);
            resourceModel.remove(resource);
            return { message: 'resource ' + resource.id + ' deleted' };
        });
    },
};
