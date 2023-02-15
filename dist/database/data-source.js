"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const config_1 = __importDefault(require("../config"));
const typeorm_1 = require("typeorm");
const entities_1 = require("./entities");
const _1676469647753_origin_1 = require("./migrations/1676469647753-origin");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: config_1.default.DB_HOST,
    port: config_1.default.DB_PORT,
    username: config_1.default.DB_USER,
    password: config_1.default.DB_PASSWORD,
    database: config_1.default.DB_NAME,
    migrationsRun: true,
    // synchronize: true,
    logging: false,
    entities: [
        entities_1.Course, entities_1.Section, entities_1.Lesson, entities_1.Resource
    ],
    subscribers: [],
    migrations: [_1676469647753_origin_1.origin1676469647753],
    // migrationsTableName: "custom_migration_table",
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log('DB connected');
})
    .catch((error) => console.log(error));
