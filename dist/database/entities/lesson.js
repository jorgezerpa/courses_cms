"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lesson = void 0;
const typeorm_1 = require("typeorm");
const section_1 = require("./section");
const resource_1 = require("./resource");
let Lesson = class Lesson {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Lesson.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Lesson.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Lesson.prototype, "video", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", Object)
], Lesson.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => resource_1.Resource, (resource) => resource.lesson, { onDelete: 'CASCADE', cascade: true }),
    __metadata("design:type", Array)
], Lesson.prototype, "resources", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => section_1.Section, section => section.lessons, { onDelete: 'CASCADE' }),
    __metadata("design:type", section_1.Section)
], Lesson.prototype, "section", void 0);
Lesson = __decorate([
    (0, typeorm_1.Entity)()
], Lesson);
exports.Lesson = Lesson;
