"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth0_1 = require("../utils/auth/auth0");
const { requiredScopes } = require('express-oauth2-jwt-bearer');
const courses_router_1 = __importDefault(require("./courses.router"));
const sections_router_1 = __importDefault(require("./sections.router"));
const lessons_router_1 = __importDefault(require("./lessons.router"));
const resources_router_1 = __importDefault(require("./resources.router"));
function routerApi(app) {
    const router = express_1.default.Router();
    app.use('/api/v1', router);
    // router.use('/user', userRouter);
    router.use(auth0_1.jwtCheck);
    router.use('/courses', requiredScopes('read:courses'), courses_router_1.default);
    router.use('/sections', sections_router_1.default);
    router.use('/lessons', lessons_router_1.default);
    router.use('/resources', resources_router_1.default);
}
exports.default = routerApi;
