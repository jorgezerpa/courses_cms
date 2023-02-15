"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boomErrorHandler = exports.errorHandler = exports.logErrors = void 0;
const response_1 = require("../responses/response");
function logErrors(err, req, res, next) {
    console.error(err);
    next(err);
}
exports.logErrors = logErrors;
function errorHandler(err, req, res, next) {
    (0, response_1.handleErrorResponse)(res, err.status || 500, err.message, {});
}
exports.errorHandler = errorHandler;
function boomErrorHandler(err, req, res, next) {
    if (err.isBoom) {
        const { output } = err;
        (0, response_1.handleErrorResponse)(res, output.statusCode || 500, output.payload, {});
        return;
    }
    next(err);
}
exports.boomErrorHandler = boomErrorHandler;
