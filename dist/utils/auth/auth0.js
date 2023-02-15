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
exports.getUserInfo = exports.jwtCheck = void 0;
const axios_1 = __importDefault(require("axios"));
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
exports.jwtCheck = auth({
    audience: 'https://courses-cms.com',
    issuerBaseURL: 'https://courses-cms.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});
const getUserInfo = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield axios_1.default.get('https://courses-cms.us.auth0.com/userinfo', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    return result.data;
});
exports.getUserInfo = getUserInfo;
