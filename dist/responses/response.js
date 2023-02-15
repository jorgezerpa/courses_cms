"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorResponse = exports.handleResponse = void 0;
const handleResponse = (res, status, message, data) => {
    res.status(status).json({
        message: message,
        data: Object.assign({}, data)
    });
};
exports.handleResponse = handleResponse;
const handleErrorResponse = (res, status, error, data) => {
    res.status(status).json({
        error: error,
        data: Object.assign({}, data)
    });
};
exports.handleErrorResponse = handleErrorResponse;
