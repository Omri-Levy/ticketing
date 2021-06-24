"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var app_1 = __importDefault(require("../../../../app"));
var constants_1 = require("../constants");
var createTicket = function () {
    return supertest_1.default(app_1.default)
        .post("/api/tickets")
        .set("Cookie", global.fakeAuth())
        .send(constants_1.testTicket);
};
exports.default = createTicket;
